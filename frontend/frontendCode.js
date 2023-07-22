document.getElementById('candyForm').addEventListener('submit', SubmitDetails)
window.addEventListener('DOMContentLoaded', async () => {
    await getlist();
})
async function SubmitDetails(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const totalPrice = price * quantity;

    const obj = {
        name,
        description,
        price,
        quantity
    };


    try {
        const response = await axios.post('http://localhost:4500/CandyStore/form', obj)
        //const response = await axios.post('https://crudcrud.com/api/e13ae3511c074ce4a074a61ec33c7896', obj)
        //  updateTotalPrice()
        getlist()
        console.log(response.data)
        document.getElementById('candyForm').reset();
    } catch (error) {
        console.log(error)
    }

}


async function getlist() {
    try {
        const response = await axios.get('http://localhost:4500/CandyStore/Candydetails')
        //const response = await axios.get('https://crudcrud.com/api/e13ae3511c074ce4a074a61ec33c7896')
        console.log(response.data)
        const candies = response.data

        candies.forEach((candy) => {
            const candyRow = document.createElement('tr');
            candyRow.setAttribute('data-id', candy.id);

            const buyButton1 = document.createElement('button');
            buyButton1.className = 'one';
            buyButton1.innerText = 'BUY1';
            buyButton1.addEventListener('click', async (e) => {
                await buy1(e);
            });

            const buyButton2 = document.createElement('button');
            buyButton2.className = 'two';
            buyButton2.innerText = 'BUY2';
            buyButton2.addEventListener('click', async (e) => {
                await buy2(e);
            });

            const buyButton3 = document.createElement('button');
            buyButton3.className = 'three';
            buyButton3.innerText = 'BUY3';
            buyButton3.addEventListener('click', async (e) => {
                await buy3(e);
            });

            const editButton = document.createElement('button');
            editButton.className = 'edit';
            editButton.innerText = 'EDIT';
            editButton.addEventListener('click', async (e) => {
                await editDetails(e)
            })

            const DeleteButton = document.createElement('button');
            DeleteButton.className = 'delete';
            DeleteButton.innerText = 'DELETE';
            DeleteButton.addEventListener('click', (e)=>{
                deleteCandy(e)
            })


            candyRow.innerHTML = `
      <td>${candy.name}</td>
      <td>${candy.description}</td>
      <td>${candy.price}</td>
      <td>${candy.quantity}</td>
   
    `;
            //   <td>${candy.totalPrice = candy.price * candy.quantity}</td>
            candyRow.appendChild(buyButton1);
            candyRow.appendChild(buyButton2);
            candyRow.appendChild(buyButton3);

            candyRow.appendChild(DeleteButton);
            candyRow.appendChild(editButton);

            document.querySelector('#candyTable tbody').appendChild(candyRow);
        })
        //updateTotalPrice();

    } catch (error) {
        console.log(error)
    }
}

// function updateTotalPrice() {
//     const candies = document.querySelectorAll('#candyTable tbody tr');
//     let total = 0;

//     candies.forEach(function (candy) {
//         const totalPrice = parseFloat(candy.querySelector('td:nth-last-child(6)').textContent);
//         total += totalPrice;
//     });

//     document.getElementById('totalPrice').textContent = total;
// }

async function editDetails(e) {
    try {
        //const candyRow = e.target.closest('tr')
        const candyRow = e.target.parentElement;
        const candyId = e.target.parentElement.getAttribute('data-id')
        console.log(candyRow);
        document.getElementById('name').value = candyRow.querySelector('td:nth-child(1)').innerText;
        document.getElementById('description').value = candyRow.querySelector('td:nth-child(2)').innerText;
        document.getElementById('price').value = parseFloat(candyRow.querySelector('td:nth-child(3)').innerText);
        document.getElementById('quantity').value = parseInt(candyRow.querySelector('td:nth-child(4)').innerText);

        await axios.delete(`http://localhost:4500/CandyStore/${candyId}`)
        getlist()
        // updateTotalPrice()

        let updateDetails = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            price: parseFloat(document.getElementById('price').value),
            quantity: parseInt(document.getElementById('quantity').value),
            // totalPrice: price * quantity,
        }
        await axios.put(`http://localhost:4500/CandyStore/Candydetails/${candyId}`, updateDetails)
        //updateTotalPrice()
    } catch (error) {
        console.log(error)
    }
}

async function deleteCandy(e) {
   // const candyRow = e.target.parentElement;
        const candyId = e.target.parentElement.getAttribute('data-id')
    await axios.delete(`http://localhost:4500/CandyStore/${candyId}`)
    /// updateTotalPrice()

}


async function buy1(e) {
    const candyRow = e.target.parentElement;
    const candyId = e.target.parentElement.getAttribute('data-id')
    let candyname=candyRow.querySelector('td:first-child').innerText
   let quantity=parseInt(candyRow.querySelector('td:nth-child(4)').innerText);
    console.log(quantity);
    quantity=quantity-1;
    console.log(quantity);
    if(quantity>0){
        candyRow.querySelector('td:nth-child(4)').innerText=quantity
        updateQuantity(candyId,quantity)
    }else{
        alert(`you cannot buy more ${candyname}`);
    }
}

async function buy2(e) {
    const candyRow = e.target.parentElement;
    const candyId = e.target.parentElement.getAttribute('data-id')
    let candyname=candyRow.querySelector('td:first-child').innerText
   let quantity=parseInt(candyRow.querySelector('td:nth-child(4)').innerText);
    console.log(quantity);
    quantity=quantity-2;
    console.log(quantity);
    if(quantity>0){
        candyRow.querySelector('td:nth-child(4)').innerText=quantity
        updateQuantity(candyId,quantity)
    }else{
        alert(`you cannot buy more ${candyname}`);
    }
}



async function buy3(e) {
    const candyRow = e.target.parentElement;
    const candyId = e.target.parentElement.getAttribute('data-id')
    let candyname=candyRow.querySelector('td:first-child').innerText
   let quantity=parseInt(candyRow.querySelector('td:nth-child(4)').innerText);
    console.log(quantity);
    quantity=quantity-3;
    console.log(quantity);
    if(quantity>0){
        candyRow.querySelector('td:nth-child(4)').innerText=quantity
        updateQuantity(candyId,quantity)
    }else{
        alert(`you cannot buy more ${candyname}`);
    }

}

async function updateQuantity(id,Quantity){
   try {
    let obj={
        quantity:Quantity
    }
    await axios.patch(`http://localhost:4500/CandyStore/${id}`, obj)
      
   } catch (error) {
    console.log(error)
   }
}