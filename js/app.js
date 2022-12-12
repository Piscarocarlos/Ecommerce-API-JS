let products = document.querySelector('#products')
let loading = document.querySelector('#loading')
let search = document.querySelector("#search")
let btnSearch = document.querySelector("#button-addon2")

btnSearch.addEventListener('click', (e)=>{
    e.preventDefault();

    fetch("https://fakestoreapi.com/products").then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);
        let results = data.filter((item)=> {
            return item.title.toLowerCase().includes(search.value.toLowerCase())
        })
        products.innerHTML = ""
        showData(results)
    });
    
})



function getProducts(url){
    fetch(url).then((res)=>{
    return res.json();
}).then((data)=>{
    console.log(data);
  showData(data)
   
});

}


function showData(data){
    if(data){
        for (let i = 0; i < data.length; i++) {
            let col = document.createElement('div');
            col.classList.add('col-md-4')
    
            let card = document.createElement('div');
            card.classList.add('card', 'shadow', 'rounded', 'bg-light')
    
            let img = document.createElement('img');
            img.src = data[i].image
            img.classList.add('img-resize', 'img-thumbnail')
    
            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body')
            
            let title = document.createElement('p');
            title.innerText = limit_word(data[i].title);
    
            let panier_group = document.createElement('div');
            panier_group.classList.add('d-flex', 'justify-content-between')
    
            let price = document.createElement('h6');
            price.innerText = "$ " +Math.round(data[i].price);
    
            let addToCartBtn = document.createElement('button');
            addToCartBtn.classList.add('btn', 'btn-dark', 'btn-sm')
            addToCartBtn.innerText = "Ajouter au panier";
    
             cardBody.appendChild(title);
             panier_group.appendChild(price)
             panier_group.appendChild(addToCartBtn)
    
             cardBody.appendChild(panier_group)
    
             card.appendChild(img);
             card.appendChild(cardBody);
    
             col.appendChild(card)
    
             products.appendChild(col);
    
        } 
       }else {
        loading.classList.remove('d-none')
       }
}

getProducts("https://fakestoreapi.com/products")


function limit_word(text){
    if(text.length > 18){
        return text.substring(0, 18) + "...";
    } else {
        return text;
    }
}
fetch('https://fakestoreapi.com/products/categories').then((res)=>{
    return res.json();
}).then((data)=>{

    for (let i = 0; i < data.length; i++) {
        console.log(data);

    let categories = document.querySelector('#categories')
    let categorieTab = document.createElement('li')
    categorieTab.classList.add('my-2')
    let link = document.createElement('a')
    link.classList.add('text-decoration-none','text-dark')
    link.innerText = data[i].charAt(0).toUpperCase() + data[i].slice(1);
    link.href = "https://fakestoreapi.com/products/category/" + data[i]

    link.addEventListener('click', (e)=>{
        e.preventDefault();
        products.innerHTML = ""
        getProducts("https://fakestoreapi.com/products/category/" + data[i])
    })
    categorieTab.appendChild(link)
    categories.appendChild(categorieTab)
    }
    
})

