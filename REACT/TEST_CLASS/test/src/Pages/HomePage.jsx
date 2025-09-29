import React from 'react'
import Demo from '../Components/Demo'
import Card from '../Components/Card'

const HomePage = () => {
    const cardsData = [
        {id:1,
            title:"Card1",
            text:"This is the first card",
            customClasses:'bg-yellow-100'

        },
        {id:2,
            title:"Card2",
            text:"This is the second card",
            customClasses:'bg-green-100'

        },
        {id:3,
            title:"Card3",
            text:"This is the Third card",
            customClasses:'bg-blue-100'

        }
    ];
  return (
  <div>
    <h1>Welcome to the HomePage</h1>
  <Demo />
  {cardsData.map((card)=>(
   <Card 
       key ={card.id}
       title= {card.title}
       text = {card.text}
       customClasses = {card.customClasses} />
  ))
  }
   


  </div>
  )
}

export default HomePage
