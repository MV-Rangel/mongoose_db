// script.js
document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        nome: document.getElementById('nome').value
    };

    try {
        const response = await fetch('/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            atualizarRegistros();
            e.target.reset();
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});

async function atualizarRegistros() {
    const registrationsDiv = document.querySelector('.registrations');
    
    try {
        const response = await fetch('/api/usuarios');
        const usuarios = await response.json();
        
        registrationsDiv.innerHTML = usuarios.map(usuario => `
            <div class="usuario-item">
                <p>Nome: ${usuario.nome}</p>
                <button onclick="deletarUsuario('${usuario._id}')">Deletar</button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function deletarUsuario(id) {
    try {
        const response = await fetch(`/api/usuarios/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            atualizarRegistros();
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Carregar registros ao iniciar
atualizarRegistros();


//usuário mongodb: mrangelpedagogo
//senha do cluster mongodb: 3et404GHtJjbeUv2
//connection string mongodb: 