
function isTokenPresent(){
    const token = localStorage.getItem('userInfo')
    console.log(token);
    return token !== null && token !== undefined
}

if (isTokenPresent()) {
    console.log('JWT token is present in local storage');
    
  } else {
    console.log('JWT token is not present in local storage');
  }

module.exports = isTokenPresent