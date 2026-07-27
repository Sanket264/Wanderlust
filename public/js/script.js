(() => {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')
//bootstap sathi validation cha jo logical code aahe to ha aahe bootstrap vrun aquire kelay validation mdhun
  
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()