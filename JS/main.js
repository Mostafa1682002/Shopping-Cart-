let cartIcon = document.querySelector('.cart-icon');
let cartShop = document.querySelector('.cart-shop');
let closeCart = document.querySelector('.close');
cartIcon.onclick = () => {
    cartShop.classList.add('active');
}
closeCart.onclick = () => {
    cartShop.classList.remove('active');
}


let noProduct = document.querySelector('.no-product');
///Add Product To Page
let contentProducts = document.querySelector('.content-products');
fetch('JS/products.json')
    .then(
        (result) => result.json()
    )
    .then((e) => {
        for (var x = 0; x < e.length; x++) {
            //create divProduct
            let divProduct = document.createElement('div');
            divProduct.className = 'product';
            divProduct.setAttribute('data-id', `${e[x].id}`);
            //create Imge
            let prodImge = document.createElement('img');
            prodImge.src = e[x].img;
            prodImge.alt = 'alternate....';
            //add imge To ProductDiv
            divProduct.appendChild(prodImge);
            //create divText
            let divText = document.createElement('div');
            divText.className = 'text';
            //create h3
            let pname = document.createElement('h3');
            let textH3 = document.createTextNode(e[x].productName);
            pname.appendChild(textH3);
            //create price
            let price = document.createElement('p');
            price.className = 'price';
            let pPrice = Number(e[x].price);
            let spanPre = document.createElement('span');
            spanPre.className = 'pre';
            let spanPreTxt = document.createTextNode(`$${Math.round(pPrice-(pPrice*.15))}`);
            let spanDis = document.createElement('span');
            spanDis.className = 'dis';
            let spanext = document.createTextNode(`$${pPrice}`);
            spanPre.appendChild(spanPreTxt)
            spanDis.appendChild(spanext)
            price.append(spanPre, spanDis);
            //create Button ADDCAERT
            let butonAdd = document.createElement('button');
            butonAdd.className = 'addCart';
            butonAdd.setAttribute('onclick', 'addProductToCart(this)')
            // butonAdd.setAttribute('onclick', 'addProductToCart(this)')
            let btnText = document.createTextNode('Add To Cart');
            butonAdd.appendChild(btnText);
            //add H3 , Price and button to DivText
            divText.append(pname, price, butonAdd);
            //add DivText and Imge To ProductDiv
            divProduct.append(prodImge, divText);
            //Add Product To COntent-products
            contentProducts.append(divProduct);
        }
    });
    
let arrId=[];    
function addProductToCart(product) {
    let xx=product.parentElement.parentElement.getAttribute('data-id');
    if(arrId.includes(xx)){
        alert('This is Product Already added in shop cart');
    }else{
        arrId.push(xx);
        //Craete Box in cart Shop
        let divBox = document.createElement('div');
        divBox.className = 'box';
        divBox.setAttribute('data-id', `${product.parentElement.parentElement.getAttribute('data-id')}`)
            //craete Imge
        let img = document.createElement('img');
        img.src = `${product.parentElement.parentElement.querySelector('img').src}`;
        img.alt = 'alternate';
        //create Text
        let divTxt = document.createElement('div');
        divTxt.className = 'text';
        //create H4
        let h4 = document.createElement('h4');
        h4.className = 'name'
        let txtH4 = document.createTextNode(product.parentElement.querySelector('h3').innerHTML);
        h4.append(txtH4);
        //craete price
        let p = document.createElement('p');
        p.className = 'price';
        let txtP = document.createTextNode(product.parentElement.querySelector('.price .pre').textContent)
        p.append(txtP);
        //create input
        let input = document.createElement('input');
        input.type = 'number';
        input.value = '1';
        input.min = '1';
        input.id = "count";
        input.setAttribute('onchange', 'updateTotal()');
        divTxt.append(h4, p, input);

        //crete delete Product
        let del = document.createElement('div');
        del.className = 'del';
        del.setAttribute('onclick', 'deleteProduct(this)')
        let i = document.createElement('i');
        i.className = 'fa-solid fa-trash';
        del.appendChild(i);

        //ADD Imge Text and Del To ProdutBox
        divBox.append(img, divTxt, del);

        //add divBox To All Product
        document.querySelector('.allProduct').append(divBox);
        updateTotal();
        countCart();

    }
    console.log(arrId);
    
    //Chanege 
    let allProductInCart = document.querySelectorAll('.allProduct .box');
    if (allProductInCart.length > 0) {
        noProduct.style.display = 'none';
    } else {
        noProduct.style.display = 'block';
    }
    
}



//Functio Update count-cart-icon
function countCart() {
    let count = 0;
    let arr = document.querySelectorAll('.allProduct .box');
    count = arr.length;
    document.querySelector('.count-cart-icon').innerHTML = count;
}
countCart();

//Function Update Total
function updateTotal() {
    let arr = document.querySelectorAll('.allProduct .box');
    let total = 0;
    arr.forEach((e) => {
        let count = e.querySelector('#count').value;
        let price = e.querySelector('.price').innerHTML;
        total += (parseInt(count) * parseFloat(price.slice(1)))
    });
    document.querySelector('.total-price span').innerHTML = `$${Math.round(total*100)/100}`
}
updateTotal();

//Update Total  If Count Input Change In Box Cart
let inputCount = document.querySelectorAll('#count');
inputCount.forEach((e) => {
    e.onchange = () => {
        updateTotal();
    }
})



//Delete Product From Cart
function deleteProduct(e) {
    e.parentElement.remove();
    //Delete dataid from arrID
    arrId.splice(arrId.indexOf(e.parentElement.getAttribute('data-id')),1)
    updateTotal();
    countCart();
    let allProductInCart = document.querySelectorAll('.allProduct .box');
    if (allProductInCart.length > 0) {
        noProduct.style.display = 'none';
    } else {
        noProduct.style.display = 'block';
    }
}



// =======================Search Products BY Name
function SearchProduct(e) {
    let inputValue = e.value.toUpperCase();
    let allProducts = document.querySelectorAll('.content-products .product');
    let allProductsName = document.querySelectorAll('.product .text h3');
    for (let i = 0; i < allProducts.length; i++) {
        let match = allProductsName[i].innerHTML;
        if (match.toUpperCase().indexOf(inputValue) > -1) {
            allProducts[i].style.display = '';
        } else {
            allProducts[i].style.display = 'none';
        }
    }
    // console.log(allProducts);
    // console.log(allProductsName);
    // console.log(inputValue);
}



let buttonBuyNow = document.querySelector('.buy');
buttonBuyNow.onclick = function() {
    let allProductInCart = document.querySelectorAll('.allProduct .box');
    if (allProductInCart.length > 0) {
        let conf = window.confirm('Are You Sure , Buy Products ?');
        if (conf) {
            allProductInCart.forEach((e) => {
                e.remove();
                updateTotal();
                countCart();
            })
        }
    } else {
        alert('Please Select Product')
    }
    noProduct.style.display = 'block'
}