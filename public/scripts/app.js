// scripts/script.js

 // --- Referencias a elementos DOM ---
        const loginFormEl = document.getElementById('login-form');
        const registerFormEl = document.getElementById('register-form');
        const forgotPasswordFormEl = document.getElementById('forgot-password-form');
        const resetPasswordFormEl = document.getElementById('reset-password-form');
        const requirementsList = document.getElementById('password-requirements');
        // const transitionDuration = 400; // Ya no se necesita

        // --- Funciones de Navegación (Instantáneas) ---

        /** Oculta un elemento instantáneamente */
        function hideElement(element) {
            if (element) {
                element.classList.add('hidden');
                // Quitar clases de visibilidad por si acaso
                // element.classList.remove('form-visible', 'form-hidden-state');
            }
        }

        /** Muestra un elemento instantáneamente */
        function showElement(element) {
            if (element) {
                element.classList.remove('hidden');
                 // Quitar clases de animación por si acaso
                // element.classList.remove('form-hidden-state');
                // element.classList.add('form-visible'); // No necesaria si no hay animación
            }
        }

        /** Muestra el formulario de Login */
        function showLoginForm() {
            console.log("Mostrando Login Form");
            hideElement(registerFormEl);
            hideElement(forgotPasswordFormEl);
            hideElement(resetPasswordFormEl);
            showElement(loginFormEl);
            clearErrors(document.getElementById('loginForm'));
        }

        /** Muestra el formulario de Registro */
        function showRegisterForm() {
             console.log("Mostrando Register Form");
            hideElement(loginFormEl);
            hideElement(forgotPasswordFormEl);
            hideElement(resetPasswordFormEl);
            showElement(registerFormEl);
            clearErrors(document.getElementById('registerForm'));
            checkPasswordRequirements('');
        }

        /** Muestra el formulario de Olvidaste Contraseña */
        function showForgotPasswordForm() {
            console.log("Mostrando Forgot Password Form");
            hideElement(loginFormEl);
            hideElement(registerFormEl);
            hideElement(resetPasswordFormEl);
            showElement(forgotPasswordFormEl);
            clearErrors(document.getElementById('forgotPasswordForm'));
        }

        /** Muestra el formulario de Restablecer Contraseña */
        function showResetPasswordForm() {
            console.log("Mostrando Reset Password Form");
            hideElement(loginFormEl);
            hideElement(registerFormEl);
            hideElement(forgotPasswordFormEl);
            showElement(resetPasswordFormEl);
            clearErrors(document.getElementById('resetPasswordForm'));
        }


        // --- Funciones de Utilidad y Validación (sin cambios) ---
        function togglePasswordVisibility(inputId, toggleButton) { const passwordInput = document.getElementById(inputId); if (!passwordInput || !toggleButton) return; const icon = toggleButton.querySelector('i'); if (!icon) return; if (passwordInput.type === 'password') { passwordInput.type = 'text'; icon.classList.replace('fa-eye', 'fa-eye-slash'); } else { passwordInput.type = 'password'; icon.classList.replace('fa-eye-slash', 'fa-eye'); } }
        function showError(inputId, message) { const inputElement = document.getElementById(inputId); const errorElement = document.getElementById(inputId + '-error'); if (inputElement) { inputElement.classList.add('input-error'); } if (errorElement) { errorElement.textContent = message; errorElement.classList.remove('hidden'); } }
        function clearError(inputId) { const inputElement = document.getElementById(inputId); const errorElement = document.getElementById(inputId + '-error'); if (inputElement) { inputElement.classList.remove('input-error'); } if (errorElement) { errorElement.textContent = ''; errorElement.classList.add('hidden'); } if (inputId === 'register-password') { checkPasswordRequirements(''); } }
        function clearErrors(formElement) { if (!formElement) return; const inputs = formElement.querySelectorAll('.input-field'); inputs.forEach(input => { if (input.id) { clearError(input.id); } }); const errorMessages = formElement.querySelectorAll('.error-message'); errorMessages.forEach(msg => { msg.textContent = ''; msg.classList.add('hidden'); }); }
        function isValidEmail(email) { const emailRegex = /^\S+@\S+\.\S+$/; return emailRegex.test(email); }
        function checkPasswordRequirements(passwordValue) { if (!requirementsList) return; if (passwordValue) { requirementsList.classList.remove('hidden'); } else { requirementsList.classList.add('hidden'); } const reqLength = document.getElementById('req-length'); const reqUppercase = document.getElementById('req-uppercase'); const reqNumber = document.getElementById('req-number'); const reqSpecial = document.getElementById('req-special'); if (reqLength) { reqLength.classList.toggle('requirement-met', passwordValue.length >= 8 && passwordValue.length <= 16); } if (reqUppercase) { reqUppercase.classList.toggle('requirement-met', /[A-Z]/.test(passwordValue)); } if (reqNumber) { reqNumber.classList.toggle('requirement-met', /\d/.test(passwordValue)); } if (reqSpecial) { reqSpecial.classList.toggle('requirement-met', /[*,.@]/.test(passwordValue)); } }
        function validatePassword(password) { if (!password) return 'La contraseña es obligatoria.'; if (password.length < 8 || password.length > 16) return 'Debe tener entre 8 y 16 caracteres.'; if (!/[A-Z]/.test(password)) return 'Debe contener al menos una letra mayúscula.'; if (!/\d/.test(password)) return 'Debe contener al menos un número.'; if (!/[*,.@]/.test(password)) return 'Debe contener al menos uno de: * , . @'; return null; }

        // --- Funciones de Validación de Formularios (onsubmit) (sin cambios) ---
        function validateLoginForm(event) { event.preventDefault(); let isValid = true; const form = event.target; clearErrors(form); const emailInput = document.getElementById('login-email'); if (!emailInput.value.trim()) { showError('login-email', 'El correo electrónico es obligatorio.'); isValid = false; } else if (!isValidEmail(emailInput.value.trim())) { showError('login-email', 'Por favor, introduce un correo electrónico válido.'); isValid = false; } const passwordInput = document.getElementById('login-password'); if (!passwordInput.value.trim()) { showError('login-password', 'La contraseña es obligatoria.'); isValid = false; } if (isValid) { console.log('Formulario de Login válido'); alert('Inicio de sesión simulado exitoso!'); /* Backend Call */ } return false; }
        async function validateRegisterForm(event) {
            event.preventDefault();

            const form = document.getElementById('registerForm');
            const formData = new FormData(form);

            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
            };

            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                const result = await response.json();
                if (response.ok) {
                    alert('Usuario registrado exitosamente');
                    showLoginForm(); // Cambiar al formulario de inicio de sesión
                } else {
                    alert(result.message || 'Error al registrar usuario');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al registrar usuario');
            }
        }

        // --- Funciones para Olvidaste/Restablecer Contraseña (sin cambios en simulación) ---
        async function handleForgotPassword(event) {
            event.preventDefault();

            const emailInput = document.getElementById('forgot-email');
            const email = emailInput.value.trim();

            if (!email) {
                showError('forgot-email', 'El correo electrónico es obligatorio.');
                return false;
            }

            try {
                const response = await fetch('/api/auth/forgot-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });

                const result = await response.json();
                if (response.ok) {
                    alert('Si existe una cuenta con ese correo, recibirás un enlace para restablecer tu contraseña.');
                    showLoginForm();
                } else {
                    showError('forgot-email', result.message || 'Error al enviar el correo.');
                }
            } catch (error) {
                console.error('Error:', error);
                showError('forgot-email', 'Ocurrió un error. Intenta nuevamente.');
            }
        }

        async function handleResetPassword(event) {
            event.preventDefault(); let isValid = true;
            const form = event.target; if (!form) return false; clearErrors(form);
            const submitButton = form.querySelector('button[type="submit"]');
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');
            const newPasswordInput = document.getElementById('new-password');
            const confirmPasswordInput = document.getElementById('confirm-new-password');
            const newPassword = newPasswordInput ? newPasswordInput.value : '';
            const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';
            if (!token) { alert('Token de restablecimiento inválido o faltante.'); isValid = false; }
            const passwordError = validatePassword(newPassword);
            if (passwordError) { showError('new-password', passwordError); isValid = false; }
            if (!confirmPassword) { showError('confirm-new-password', 'Por favor, confirma tu nueva contraseña.'); isValid = false; }
            else if (newPassword !== confirmPassword) { if (!passwordError) { showError('confirm-new-password', 'Las contraseñas no coinciden.'); isValid = false; } }
            if (isValid) {
                console.log('Enviando nueva contraseña con token:', token);
                if(submitButton) submitButton.disabled = true;
                try {
                    console.log("Simulando llamada a /api/reset-password...");
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    alert('Contraseña restablecida con éxito.');
                    window.history.replaceState({}, document.title, window.location.pathname);
                    showLoginForm();
                } catch (error) {
                    console.error('Error en handleResetPassword:', error);
                    alert(error.message || 'Ocurrió un error al restablecer la contraseña.');
                    if(submitButton) submitButton.disabled = false;
                }
            }
            return false;
        }


        // --- Listeners Adicionales (sin cambios) ---
        document.querySelectorAll('.input-field').forEach(input => {
            const excludeIds = ['register-password', 'forgot-email', 'new-password'];
            if (!excludeIds.includes(input.id)) {
                input.addEventListener('input', () => { if (input.id) { clearError(input.id); } });
            }
            if (input.id === 'register-confirm-password') { input.addEventListener('input', () => { if (input.id) { clearError(input.id); clearError('register-password'); } }); }
            if (input.id === 'confirm-new-password') { input.addEventListener('input', () => { if (input.id) { clearError(input.id); clearError('new-password'); } }); }
        });

        // --- Inicialización (sin cambios) ---
        function initializeApp() {
            console.log("Inicializando aplicación...");
            checkPasswordRequirements(''); // Ocultar lista al inicio
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');
            if (token) {
                console.log("Token encontrado en URL, mostrando form de reset.");
                showResetPasswordForm();
            } else {
                console.log("No hay token, mostrando form de login.");
                showLoginForm();
            }
        }
        initializeApp(); // Ejecutar al cargar el script