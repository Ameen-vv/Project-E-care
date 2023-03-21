import React,{createContext,useState,useEffect,useCallback} from 'react'
import  {signInWithGoogle} from '../firebase/config'
import axios from 'axios'
import { doctorUrl, userUrl } from '../../apiLinks/apiLinks'
export const firebaseContext = createContext()
export const userContext = createContext('')





function Contexts({children}) {
  const [user, setUser] = useState('user');
  const doctorCheck = () => {
    const token = localStorage.getItem('doctorToken');
    const headers = { Authorization: token };
    axios
      .get(`${doctorUrl}authenticate`, { headers })
      .then((response) => {
        response.status === 200 ? setUser('doctor') : setUser(null);
      })
      .catch(() => {
        setUser(null);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      const headers = { Authorization: token };
      axios
        .get(`${userUrl}authenticate`, { headers })
        .then((response) => {
          response.status === 200 ? setUser("user") : doctorCheck();
        })
        .catch(() => {
          doctorCheck();
        });
    } else {
      doctorCheck();
    }
  }, []);

  return (
    <userContext.Provider value={{user,setUser}}>
      <firebaseContext.Provider value={{signInWithGoogle}}>
        {children}
      </firebaseContext.Provider>
    </userContext.Provider>
  );
}

export default Contexts;

