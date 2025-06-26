document.addEventListener("DOMContentLoaded", () => {

    const API = "https://dummyjson.com"
    const limitLoad = 8

    async function getData(endpoint, callback) {
        try {
            const res = await fetch(`${API}${endpoint}`)
            const data = await res.json()
            callback(data)
            loader.style.display = "none"
        } catch (err) {
            console.error(err)
        }
    }

    window.onload = () => {
        getData(`/products?limit=${limitLoad}`, cardRender)
        getData(`/products/category-list`, categoryRender)
    }

    const wrapperEL = document.querySelector(".wrapper")
    const categoryCollectionEL = document.querySelector(".category__collection")
    const moreBtnEL = document.querySelector(".more-btn")


    function cardRender(data) {
        wrapperEL.innerHTML = ""
        const fr = document.createDocumentFragment()
        data.products.forEach(item => {
            const article = document.createElement("article")
            article.classList.add("card")
            article.innerHTML = `
				<div>
					<img class="cardImg" src="${item.thumbnail}" alt="Card img" />
				</div>
				<div>
					<h3>${item.title}</h3>
					<b>Category: ${item.category}</b>
					<p>Brand: <i>${item.brand}</i></p>
					<strong>Price: ${item.price}$</strong>
				</div>
            `
            fr.appendChild(article)
        })
        wrapperEL.appendChild(fr)
    }

    function categoryRender(data) {
        const fr = document.createDocumentFragment()
        data.forEach(item => {
            const li = document.createElement("li")
            li.dataset.endpoint = `/products/category/${item}`
            li.innerHTML = item.toUpperCase()
            fr.appendChild(li)
        })
        categoryCollectionEL.appendChild(fr)
    }

    categoryCollectionEL.onclick = (e) => {
        if (e.target.tagName == "LI") {
            const path = e.target.dataset.endpoint
            getData(`${path}?limit=${limitLoad * count}`, cardRender)
        }
    }

    let count = 1
    moreBtnEL.onclick = () => {
        count++
        getData(`/products?limit=${limitLoad * count}`, cardRender)

    }
})