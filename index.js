let captchaRequired = false;
        let captchaSolved = false;
        let N = 0;

        document.getElementById("input-form").addEventListener("submit", async function(e) {
            e.preventDefault();
            N = parseInt(document.getElementById("n").value, 10);
            if (N < 1 || N > 1000) {
                alert("Veuillez entrer un nombre entre 1 et 1000.");
                return;
            }
            document.getElementById("input-form").style.display = "none";
            document.getElementById("result-container").style.display = "block";

            for (let i = 1; i <= N; i++) {
                try {
                    const response = await fetch("https://api.prod.jcloudify.com/whoami");

                    if (response.status === 403) {
                        captchaRequired = true;
                        break; // Si un CAPTCHA est nécessaire, arrêtez la boucle pour le résoudre
                    }

                    await response.json(); // Traitement de la réponse (nous ne faisons rien avec les données ici)
                    const li = document.createElement("li");
                    li.textContent = `${i}. Forbidden`;
                    document.getElementById("sequence").appendChild(li);

                    // Attendre 1 seconde entre chaque requête
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } catch (error) {
                    console.error("Erreur lors de l'appel API", error);
                }
            }

            if (captchaRequired) {
                // Afficher le formulaire CAPTCHA
                document.getElementById("captcha-container").style.display = "block";
            }
        });

        document.getElementById("captcha-solve-btn").addEventListener("click", async function() {
            // Vérifiez si le CAPTCHA a été résolu
            const captchaResponse = grecaptcha.getResponse();
            if (captchaResponse.length === 0) {
                alert("Veuillez résoudre le CAPTCHA.");
                return;
            }

            // Ici, vous pouvez envoyer le `captchaResponse` à votre serveur pour le valider
            captchaSolved = true;
            document.getElementById("captcha-container").style.display = "none"; // Masquer le CAPTCHA
            // Relancer la soumission pour continuer la séquence
            await submitWithCaptchaSolved();
        });

        async function submitWithCaptchaSolved() {
            let i = N;
            for (i; i <= N; i++) {
                try {
                    const response = await fetch("https://api.prod.jcloudify.com/whoami");

                    if (response.status === 403) {
                        continue; // Si le CAPTCHA est encore requis, continuez la boucle
                    }

                    await response.json();
                    const li = document.createElement("li");
                    li.textContent = `${i}. Forbidden`;
                    document.getElementById("sequence").appendChild(li);

                    // Attendre 1 seconde entre chaque requête
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } catch (error) {
                    console.error("Erreur lors de l'appel API", error);
                }
            }
        }