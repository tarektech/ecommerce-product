function toggleMenu() {
  const navlink = document.querySelector('.nav-link_shopping');
  const cart_items = document.querySelector('.cart-items');
  const item_info__container = document.querySelector('.item-info__container');
  navlink.addEventListener('click', () => {
    if (cart_items.classList.contains('cart-items_show')) {
      cart_items.classList.remove('cart-items_show');
    } else {
      cart_items.classList.add('cart-items_show');
    }
  });

  cart_items.addEventListener('click', (event) => {
    event.stopPropagation();
  });
}
toggleMenu();

function buttonUpdate() {
  // increment and decrement quantity button
  const quantity = document.querySelector('.counter'); // quantity
  const decrementButton = document.querySelector('.btn-minus'); // decrement button
  const incrementButton = document.querySelector('.btn-plus'); // increment button
  let counter = 0;

  // increment and decrement quantity button
  function increment() {
    counter++;
    updateCounter();
  }

  function decrement() {
    if (counter > 0) {
      counter--;
      updateCounter();
    }
  }

  // updating the quantity value
  function updateCounter() {
    quantity.textContent = counter;
  }

  // calling the function to update the quantity value
  decrementButton.addEventListener('click', decrement);
  incrementButton.addEventListener('click', increment);
}
buttonUpdate();

function imageUpdate() {}
/* 
  1. clicking on the product image to open the modal
  2. clicking on the modal overlay to close the modal
  3. clicking on the prev and next button to change the modal image
  4. clicking on the small images to change the modal image
*/

const product = document.querySelector('.product'); // product image
const banner = document.querySelectorAll('.banner'); // small images of the product
const modal_overlay = document.querySelector('.modal-overlay'); // modal overlay
const modal = document.querySelector('.modal'); // modal

product.addEventListener('click', function () {
  modal_overlay.style.display = 'flex';
  modalImage.src = product.src;
});

modal_overlay.addEventListener('click', function (event) {
  if (event.target === modal_overlay) {
    modal_overlay.style.display = 'none';
  }
});

// navigating to next and prev image in modal
// pressing on small images navigate to the image in modal
const modalImage = document.getElementById('modal-image'); // modal product image
const prevButton = document.getElementById('prev'); //prev button on modal
const nextButton = document.getElementById('next'); //next button on modal
const banner_modal = document.querySelectorAll('.banner-modal'); // small images of the product in modal

var currentImage = 0;

//click on the product to update the product image
function updateProductImage() {
  product.src = `images/image-product-${currentImage + 1}.jpg`;
}

// clicking on banner small images to change the product image
function productImage() {
  banner.forEach((event, index) => {
    event.addEventListener('click', () => {
      currentImage = index;
      updateProductImage();
    });
  });
}

// calling the function to update the product image
const ImageProductUpdate = () => {
  productImage(product);
  productImage(banner_modal);
};
ImageProductUpdate();

// updating the modal image
function updateModalImage() {
  modalImage.src = `images/image-product-${currentImage + 1}.jpg`;
}

// clicking on the prev and next button to change the modal image
function prevImage() {
  currentImage = (currentImage - 1 + 4) % 4;
  updateModalImage();
}

// clicking on the prev and next button to change the modal image
function nextImage() {
  currentImage = (currentImage + 1) % 4;
  updateModalImage();
}

// calling the function to update the modal image
prevButton.addEventListener('click', prevImage);
nextButton.addEventListener('click', nextImage);

// navigating to next and prev image in modal
navigateImage = () => {
  banner_modal.forEach((element, index) => {
    element.addEventListener('click', () => {
      currentImage = index;
      updateModalImage();
    });
  });
};

// calling the function to navigate to next and prev image in modal
navigateImage();

// add to cart
function createItemElement() {
  let itemPrice = document.getElementById('item-price').innerHTML;
  let counter = document.querySelector('.counter').innerHTML;
  let totalPrice = document.querySelector('.total-price').innerHTML;

  let itemElement = document.createElement('div');
  itemElement.classList.add('item-info');
  itemElement.innerHTML = `
    <img src="images/image-product-${currentImage + 1}.jpg" alt="" />
    <div class="item-text-info">
      <h5 class="item-description">Fall Limited Edition Sneakers</h5>
      <span class="item-price">
        ${itemPrice} 
        <span id="quantity">X ${counter}</span> 
      </span>
    </div>
    <svg class="shopping-cart icon-delete">
      <use xlink:href="/images/icon-delete.svg#icon-delete"></use>
    </svg> `;

  // Calculate total price and update the HTML
  let total = parseFloat(totalPrice);
  total = total * parseFloat(counter);
  console.log(total);

  //totalPrice.innerHTML = total.toFixed(2); // Round to 2 decimal places

  return itemElement;
}

function attachDeleteListener(deleteIcon) {
  deleteIcon.addEventListener('click', function (event) {
    let itemInfo = deleteIcon.parentElement;
    itemInfo.remove();
    console.log('delete item');
  });
}

let deleteItems = document.querySelectorAll('.icon-delete');
deleteItems.forEach(attachDeleteListener);

function addcart(itemElement) {
  let shoppingList = document.querySelector('.item-info__container');
  shoppingList.appendChild(itemElement);

  // attach the event listener to the delete icon of the appended item
  let deleteIcon = itemElement.querySelector('.icon-delete');
  attachDeleteListener(deleteIcon);
}

let addToCartButton = document.querySelector('.add-to-cart');
addToCartButton.addEventListener('click', function () {
  let itemElement = createItemElement();
  addcart(itemElement);
});

// remove the item from the cart
