let cart = [];
let totalPrice = 0;

// Função para adicionar ao carrinho
function addToCart(bookName, price, quantityId) {
    const quantity = parseInt(document.getElementById(quantityId).value);
    
    // Verifica se o item já existe no carrinho
    const existingItem = cart.find(item => item.name === bookName);

    if (existingItem) {
        // Se já existe, apenas aumenta a quantidade
        existingItem.quantity += quantity;
    } else {
        // Se não existe, adiciona o item ao carrinho
        const item = {
            name: bookName,
            price: price,
            quantity: quantity
        };
        cart.push(item);
    }

    // Atualiza a exibição do carrinho
    updateCart();
}

// Função para comprar imediatamente
function buyNow(bookName, price) {
    cart = [{ name: bookName, price: price, quantity: 1 }];
    updateCart();
    processPayment('PIX'); // Simula o pagamento com PIX
}

// Atualizar o carrinho
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItems.innerHTML = '';

    totalPrice = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - R$ ${item.price} x ${item.quantity}`;
        cartItems.appendChild(listItem);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Total: R$ ${totalPrice.toFixed(2)}`;
}

// Processar o pagamento
function processPayment(paymentMethod) {
    const feedback = document.getElementById('feedback');
    feedback.style.display = 'block';
    feedback.textContent = `Pagamento realizado com sucesso via ${paymentMethod}.`;
    setTimeout(() => {
        feedback.style.display = 'none';
        cart = [];
        updateCart();
    }, 3000); // Limpa o carrinho após 3 segundos
}
let currentPage = 1; // Página inicial
let totalPages = 10; // Total de páginas, você pode calcular dinamicamente

// Função para ir para uma página específica
function goToPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages) return; // Impede navegação além das páginas existentes
    currentPage = pageNumber;
    updatePagination(); // Atualiza a barra de paginação
    loadPageContent();  // Carrega o conteúdo da página selecionada
}

// Função para atualizar a barra de paginação
function updatePagination() {
    const pageNumbersContainer = document.querySelector('.page-numbers');
    pageNumbersContainer.innerHTML = ''; // Limpa as páginas anteriores

    // Adiciona os números das páginas dinâmicamente
    let startPage = Math.max(1, currentPage - 2);  // Limita a página inicial da exibição
    let endPage = Math.min(totalPages, currentPage + 2); // Limita a página final da exibição

    for (let i = startPage; i <= endPage; i++) {
        const pageLink = document.createElement('button');
        pageLink.classList.add('page-link');
        pageLink.textContent = i;
        pageLink.onclick = () => goToPage(i);
        
        // Marca a página ativa
        if (i === currentPage) {
            pageLink.classList.add('active');
        }
        
        pageNumbersContainer.appendChild(pageLink);
    }

    // Habilita ou desabilita os botões "Anterior" e "Próxima"
    document.querySelector('.prev').disabled = currentPage === 1;
    document.querySelector('.next').disabled = currentPage === totalPages;
}

// Função fictícia para carregar o conteúdo da página (exemplo)
function loadPageContent() {
    // Exemplo: Exibe no console o conteúdo da página
    console.log(`Carregando conteúdo da página ${currentPage}`);
    // Aqui você pode substituir por uma função real que carrega os livros dessa página
}

// Inicializa a paginação ao carregar a página
updatePagination();

// Trocar a imagem conforme o clique nas seções
function changeImage(imageName) {
    const image = document.getElementById("currentImage");
    image.src = "img/" + imageName;
}

// Função de busca interativa
function search() {
    const input = document.getElementById("search-input");
    const filter = input.value.toLowerCase();
    const ul = document.getElementById("results-list");
    ul.innerHTML = ""; // Limpar resultados antigos

    // Lista de palavras-chave para busca
    const keywords = [
        "deficiência auditiva", 
        "libras", 
        "deficiência visual"
    ];

    keywords.forEach(keyword => {
        if (keyword.toLowerCase().includes(filter)) {
            const li = document.createElement("li");
            li.textContent = keyword;
            li.onclick = function() {
                alert("Você selecionou: " + keyword);
            };
            ul.appendChild(li);
        }
    });
}
// Função para gerar o QR Code
function generateQRCode(paymentLink) {
    // Mostrar o contêiner do QR Code
    document.getElementById('qrcode-container').classList.remove('hidden');
    
    // Gerar o QR Code
    QRCode.toCanvas(document.getElementById('qrcode'), paymentLink, function (error) {
        if (error) console.error(error);
        console.log('QR Code gerado!');
    });
}

// Função para processar o pagamento
function processPayment(method) {
    let paymentLink;

    // Lógica para gerar o link de pagamento baseado no método selecionado
    if (method === 'PIX') {
        // Exemplo de link para pagamento via PIX (pode ser um link gerado dinamicamente)
        paymentLink = 'https://pay.example.com/pix/1234567890';
    } else if (method === 'Cartão') {
        // Exemplo de link para pagamento via Cartão
        paymentLink = 'https://pay.example.com/cartao/1234567890';
    }

    // Gerar o QR Code com o link de pagamento
    generateQRCode(paymentLink);
}

// Função para o botão "Comprar Agora"
function buyNow(bookName, price) {
    // Exemplo de link de pagamento (pode ser um link de checkout)
    let paymentLink = 'https://pay.example.com/checkout/' + bookName + '/' + price;
    generateQRCode(paymentLink);
}
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Esconde todas as abas
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove a classe ativa de todas as abas
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Exibe a aba clicada e adiciona a classe ativa
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

// Abre a aba "Eventos" por padrão
document.querySelector(".tablinks").click();
