export default {
    inserted: el => {
        function loadImage() {
            const imageElement = Array.from(el.children).find(el => el.nodeName === "IMG");
            if (imageElement) {
                imageElement.addEventListener("load", () => {
                    setTimeout(() => el.classList.add("loaded"), 100);
                });
                imageElement.addEventListener("error", () =>
                    console.log(
                        "Image does not exist at URL (" +
                            imageElement.dataset.url +
                            ") provided by source NewsAPI, but the page still loaded gracefully."
                    )
                );
                imageElement.src = imageElement.dataset.url;
            }
        }

        function handleIntersect(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage();
                    observer.unobserve(el);
                }
            });
        }

        function createObserver() {
            const options = {
                root: null,
                threshold: "0"
            };
            const observer = new IntersectionObserver(handleIntersect, options);
            observer.observe(el);
        }
        if (window["IntersectionObserver"]) {
            createObserver();
        } else {
            loadImage();
        }
    }
};
