document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const submitButton = document.getElementById('submitButton');
  const successMessage = document.getElementById('successMessage');
  const buttonText = submitButton.querySelector('.button-text');
  const spinner = submitButton.querySelector('.spinner');

  // Add placeholder attribute to prevent label overlap
  document.querySelectorAll('input, textarea').forEach(element => {
    element.setAttribute('placeholder', ' ');
  });

  const validateField = (field) => {
    const value = field.value.trim();
    let error = '';

    switch (field.name) {
      case 'name':
        if (!value) {
          error = 'Name is required';
        } else if (value.length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;

      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'message':
        if (!value) {
          error = 'Message is required';
        } else if (value.length < 10) {
          error = 'Message must be at least 10 characters';
        }
        break;
    }

    const errorElement = field.nextElementSibling.nextElementSibling;
    if (error) {
      field.classList.add('error');
      errorElement.textContent = error;
      return false;
    } else {
      field.classList.remove('error');
      errorElement.textContent = '';
      return true;
    }
  };

  // Real-time validation
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => validateField(field));
    field.addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all required fields
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) return;

    // Show loading state
    submitButton.disabled = true;
    buttonText.textContent = 'Sending...';
    spinner.style.display = 'block';

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success message
      successMessage.classList.add('show');
      form.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.classList.remove('show');
      }, 5000);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      // Reset button state
      submitButton.disabled = false;
      buttonText.textContent = 'Submit';
      spinner.style.display = 'none';
    }
  });
});