        // Handle amount button selection
        const amountBtns = document.querySelectorAll('.amount-btn');
        const amountInput = document.querySelector('.amount-input');

        amountBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove selected class from all buttons
                amountBtns.forEach(b => b.classList.remove('selected'));
                // Add selected class to clicked button
                btn.classList.add('selected');
                // Update input value
                const amount = btn.textContent.replace('$', '');
                amountInput.value = amount;
                updateTip();
            });
        });

        // Handle custom amount input
        amountInput.addEventListener('input', (e) => {
            // Remove selected class from all buttons
            amountBtns.forEach(btn => btn.classList.remove('selected'));
            
            // Format input value
            let value = e.target.value.replace(/[^0-9.]/g, '');
            if (value) {
                value = parseFloat(value).toFixed(2);
                e.target.value = value;
            }
            updateTip();
        });

        // Handle tip calculation
        const tipSlider = document.querySelector('.tip-slider');
        const tipAmount = document.querySelector('.tip-amount');

        function updateTip() {
            const amount = parseFloat(amountInput.value) || 0;
            const tipPercentage = parseInt(tipSlider.value);
            const tipValue = (amount * tipPercentage / 100).toFixed(1);
            tipAmount.textContent = `$${tipValue} (${tipPercentage}%)`;
        }

        tipSlider.addEventListener('input', updateTip);

        // Initialize tip
        updateTip();