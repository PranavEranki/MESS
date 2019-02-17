import React from 'react'
import Link from 'gatsby-link'
import { Timeline } from 'react-twitter-widgets'

function loadData(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
       console.log(xhttp.responseText);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

const Social = () => (
  <div className='box'
  style={{
    height: '490px',
    width: '360px',
    marginTop: '20px',
    marginBottom:'20px',
    marginLeft: 'px',
    paddingTop: '2px'
  }}>

  </div>
)

export default Social
