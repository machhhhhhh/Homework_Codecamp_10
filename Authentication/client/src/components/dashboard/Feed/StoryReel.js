import React from 'react'
import '../../css/story.css'
import Story from './Story'

function StoryReel() {
  return (
    <div className='story-reel' >
        <Story
          image = "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
          avatar = "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/16:9/w_2123,h_1194,c_limit/phonepicutres-TA.jpg"
          title = "March"
          />
        <Story
          image = "https://ichef.bbci.co.uk/news/999/cpsprodpb/79F2/production/_123381213_06.jpg"
          avatar = "https://media.istockphoto.com/photos/villefranche-on-sea-in-evening-picture-id1145618475?k=20&m=1145618475&s=612x612&w=0&h=_mC6OZt_eWENYUAZz3tLCBTU23uvx5beulDEZHFLsxI="
          title = "Erk"
          />
        <Story
          image = "https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg"
          avatar = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          title = "Ohm"
          />
        <Story
          image = "https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340"
          avatar = "https://media.macphun.com/img/uploads/customer/how-to/579/15349456005b7d69405aabf4.32904503.jpg?q=85&w=1340"
          title = "Blue"
          />
        <Story
          image = "https://media.istockphoto.com/photos/slave-hands-broken-chains-with-bird-flying-picture-id1296601764?b=1&k=20&m=1296601764&s=170667a&w=0&h=0hjKKZZYp2Wl1BRxopegdWrJwTwi1Vlbs_aXdmhhr_o="
          avatar = "https://assets.entrepreneur.com/content/3x2/2000/20200429211042-GettyImages-1164615296.jpeg"
          title = "Glof"
          />
    </div>
  )
}

export default StoryReel