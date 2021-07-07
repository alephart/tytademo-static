import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const BackHistory = () => {

  const [ locationKeys, setLocationKeys ] = useState([])
  const history = useHistory()

  useEffect(() => {
    // window.addEventListener('popstate', (event) => {
    //   alert("You message");
    // });

    window.onpopstate = (event) => {
      alert(`location: ${document.location}, state: ${JSON.stringify(event.state)}`)
      window.history.go(-2);
    };

    // window.onpopstate = (event) => {
    //   //const { hash } = location;
    //   console.log(document.location);
    //   window.history.go();
    // }
    
    // if (window.history && window.history.pushState) {
    //   window.onpopstate = (event) => {
    //     alert('Back button was pressed.');
    //   }
    // }
  }, []);

  // useEffect(() => {
  //   history.listen(location => {
  //     if (history.action === 'PUSH') {
  //       setLocationKeys([ location.key ])
  //     }

  //     if (history.action === 'POP') {
  //       if (locationKeys[1] === location.key) {
  //         setLocationKeys(([ _, ...keys ]) => keys)

  //         // Handle forward event
  //         console.log('forward!!');

  //       } else {
  //         setLocationKeys((keys) => [ location.key, ...keys ])

  //         // Handle back event
  //         console.log('back!!');

  //       }
  //     }
  //   })
  // }, [ locationKeys, ])

  return (
    <div>Estoy aqui!!!</div>
  )
}

export default BackHistory;