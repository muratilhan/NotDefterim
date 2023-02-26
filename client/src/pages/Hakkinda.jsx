import  axios  from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../App';
import "../styles/about.css"
import TopNUsers from '../components/TopNUsers';
import datas from "../datas/Data"

function Hakkinda() {


    const context = useContext(Context)
    const [userAmount, setUserAmount] = useState(0);
    
    useEffect(()=>{
        const fetchUsers = async () => {
            const res = await axios.get("https://notdefterim.onrender.com/user/users")
            setUserAmount(res.data.length);
        }
        fetchUsers();    
    },[])

  return (
    <div className='hakkinda-page-container'>
        <img className='hakkinda-book' src="https://www.stockillustrations.com/Image.aspx?src=medres&name=WIRY0252.jpg&sz=572&fitw=yg" alt="" />
        <div className='hakkinda-page-announcement'>
        <div className='search-header'> <h4> Bilgilendirme  </h4></div>
            <p>
                <b>Not Defterim</b> uygulaması Uludağ Üniversitesinde okuyan öğrencilerin derslerinde birbirlerine yardımcı olabilmesi için tasarlanmıştır.
                Giriş yapan kullanıcılar anasayfada diğer kullanıcıların paylaştığı notlara erişebilme imkanına sahiptir.
            </p>
            <p>
                Giriş yapan kullanıcılar Anasayfa'da yer alan Ders Notu Paylaş kısmından notlarını paylaşabilir.Aynı zamanda sol taraftaki Search kısmından istediği notlara hızlıca ulaşabilir.
            </p>
            <p>
                <b>Öneri, Fikir ve Şikayet</b>leriniz için İletişim kısmını kullanabilirsiniz. Sizlere daha iyi hizmet vermek için bize ulaşmaktan lütfen çekinmeyiniz.
            </p>
            <p>
                Siteye dil desteği sağlamak isterseniz, yine aynı şekilde iletişime geç kısmından bize ulaşabilirsiniz.
            </p>
            <p>
                Not Defterim © 2022
            </p>
        </div>
        <div className='hakkinda-page-info-container'>
            <div className='hakkinda-page-info'>
                <div className="hi">
                    <div className='search-header'> <h4> İstatistikler  </h4></div>
                        <div className='top-users-container'>      
                            <li> <div className='hakkinda-page-li'><i className="fa-solid fa-users"></i> Üye Sayısı</div><div> {userAmount} </div> </li> 
                            <li> <div className='hakkinda-page-li'><i className="fa-solid fa-file-pen"></i> Ders Notları</div><div> {context.notes.length} </div> </li> 
                            <li> <div className='hakkinda-page-li'><i className="fa-solid fa-book-open"></i> Ders Sayısı</div><div> {datas.length} </div> </li> 
                        </div>
                    </div>
                    <TopNUsers/>
                    
                </div>
            </div>
        </div>)}

export default Hakkinda

