let isLoggedIn = false;
let cart = [];

// Lógica para o formulário de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage');
    
    loginMessage.textContent = '';

    if (username === 'admin' && password === 'admin') {
        isLoggedIn = true;
        loginMessage.textContent = 'Login bem-sucedido!';
        loginMessage.style.color = 'green';

        document.getElementById('endereco').style.display = 'block';
        document.getElementById('produtos').style.display = 'block';
        document.getElementById('resumo').style.display = 'block';
    } else {
        loginMessage.textContent = 'Usuário ou senha incorretos.';
    }
});

// Lógica para o formulário de endereço
document.getElementById('addressForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const street = document.getElementById('street').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value;
    const addressMessage = document.getElementById('addressMessage');
    
    addressMessage.textContent = ''; // Limpa qualquer mensagem anterior

    // Validação customizada dos campos
    if (!street || !city || !state) {
        addressMessage.textContent = 'Por favor, preencha todos os campos obrigatórios para salvar o endereço.';
        addressMessage.style.color = 'red';
    } else {
        addressMessage.textContent = 'Endereço salvo com sucesso!';
        addressMessage.style.color = 'green';
    }
});

// Função para adicionar produtos ao carrinho
function addToCart(productName, price) {
    if (!isLoggedIn) {
        alert('Você precisa estar logado para adicionar produtos ao carrinho.');
        return;
    }

    const quantity = document.getElementById(`quantity${productName === 'Produto 1' ? 1 : 2}`).value;
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += parseInt(quantity);
    } else {
        cart.push({ name: productName, price, quantity: parseInt(quantity) });
    }
    updateCart();
}

// Atualiza o resumo do pedido com os produtos no carrinho
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalAmount = document.getElementById('totalAmount');
    cartItems.innerHTML = '';
    
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <p>${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity} = R$ ${itemTotal.toFixed(2)}</p>
                <button onclick="removeFromCart('${item.name}')">Remover</button>
            </div>
        `;
    });

    totalAmount.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Remove um produto do carrinho
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
}

// Lógica para finalizar o pedido
document.getElementById('finalizeOrder').addEventListener('click', function() {
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const orderMessage = document.getElementById('orderMessage');

    orderMessage.textContent = '';

    if (!isLoggedIn) {
        orderMessage.textContent = 'Você precisa estar logado para finalizar o pedido.';
    } else if (!street || !city || !state) {
        orderMessage.textContent = 'Você deve preencher o endereço completo antes de finalizar o pedido.';
    } else if (cart.length === 0) {
        orderMessage.textContent = 'O carrinho está vazio. Adicione produtos antes de finalizar o pedido.';
    } else {
        orderMessage.textContent = 'Pedido finalizado com sucesso!';
        orderMessage.style.color = 'green';
        cart = [];
        updateCart();
    }
});
