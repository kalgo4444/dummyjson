document.addEventListener("DOMContentLoaded", () => {
    const API = `https://dummyjson.com`
    const limitCard = 8

    async function fetchData(endpoind, callback) {
        const res = await fetch(`${API}${endpoind}`)
        const data = await res.json()
        callback(data)
        loader.style.display = "none"
    }


    window.onload = () => {
        fetchData(`/recipes/tags`, collectionRender)
        fetchData(`/recipes?limit=${limitCard}`, cardRender)
    }

    const categoryCollectionEl = document.querySelector(".category__collection")
    const wrapperEl = document.querySelector(".wrapper")
    const moreBtn = document.querySelector(".more-btn")

    function collectionRender(data) {
        const fr = document.createDocumentFragment()
        data.forEach(item => {
            const li = document.createElement("li")
            li.dataset.endpoind = `/recipes/tag/${item}`
            li.innerHTML = item.toUpperCase()
            fr.appendChild(li)
        })
        categoryCollectionEl.appendChild(fr)
    }

    categoryCollectionEl.onclick = (e) => {
        if (e.target.tagName = "LI") {
            const path = e.target.dataset.endpoind
            fetchData(`${path}`, cardRender)
        }
    }


    function cardRender(data) {
        wrapperEl.innerHTML = ""
        const fr = document.createDocumentFragment()
        data.recipes.forEach(item => {
            const article = document.createElement("article")
            article.classList.add("card")
            article.innerHTML = `
				<div>
					<img class="cardImg" src="${item.image}" alt="Card img" />
				</div>
				<div>
					<h3>${item.name}</h3>
					<b>Country: ${item.cuisine}</b>
					<p>Rating: ${item.rating}</p>
					<strong>Price: ${item.reviewCount}$</strong>
				</div>
            `
            fr.appendChild(article)
        })
        wrapperEl.appendChild(fr)
    }

    let count = 1
    moreBtn.addEventListener("click", () => {
        count++
        fetchData(`/recipes?limit=${limitCard * count}`, cardRender)
    })

})