class DrinkInfo{
    constructor(name, id, category){
        this.name = name
        this.id = id
        this.category = category
    }
}

const ordDrink = async () => {
    let promArr = []
    for(let i =0; i < 1; i++ ){
        let randDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa').then(resp => resp.json())
        promArr.push(randDrink)
    }
    let promise = await Promise.all(promArr)
    return promise
  }
  ordDrink().then(data => {

    let cardgrid = document.querySelector('.card-grid')
    let modal = document.querySelector('.md')

    let htmlStr = ''
    let modalStr = ''

    drinkInfoArr= []

    data.forEach(drinkObj => {
        for(let i =0; i<9;i++){
        let drink = drinkObj.drinks[i]
        console.log(drinkObj.drinks[i]);
        let { strDrink, strDrinkThumb, strCategory, idDrink } = drink
        htmlStr += `<a class="card" href="#${idDrink}" id="${strDrink}" title="${strDrink}">
        <div class="card__background" id="card" style="background-image: url(${strDrinkThumb})" title="${strDrink}"></div>
        <div class="card__content" id="card" title="${strDrink}">
          <p class="card__category" id="card" title="${strDrink}">${strCategory}</p>
          <h3 class="card__heading" id="card" title="${strDrink}">${strDrink}</h3>
        </div>
      </a>
  `
            let newDrink = new DrinkInfo(strDrink, idDrink, strCategory)

            drinkInfoArr.push(newDrink)

        }


    })
    document.addEventListener('click', e=>{

        if(e.target.id == 'card'){

            // let targetName = e.target.title

            // for(let i = 0; i < drinkInfoArr.length; i++){

            //     if(drinkInfoArr[i].name == targetName){

            //         modal.innerHTML = `      
                    
            //         <div class="modal-container" id="${drinkInfoArr[i].id}">
            //         <div class="modal">
            //           <h1 class="modal__title">${drinkInfoArr[i].name}</h1>
            //           <p class="modal__text"> ${drinkInfoArr[i].category}</p>
            //           <button class="modal__btn">Button &rarr;</button>
            //           <a href="#" class="link-2" id="x"></a>
            //         </div>
            //       </div>
            //       </div>
            //         </div>`
            //     }
            // }

            appearModal('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007').then((result)=>{


                console.log(result);
                modal.innerHTML = result
            })

            document.querySelector('.md').style.display = 'flex';
        }

       
        if(e.target.id == 'x'){
            
            modal.style.display = 'none';
        }
    })



    cardgrid.innerHTML = htmlStr
  })
  