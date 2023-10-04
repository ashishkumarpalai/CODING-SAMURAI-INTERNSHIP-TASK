document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#contact-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch('https://coading-samurai-internship-blog-app.onrender.com/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.message === "Message sent successfully") {
                    alert('Message sent successfully.');
                    form.reset();
                } else {
                    alert('Error sending message. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            });
    });
});
