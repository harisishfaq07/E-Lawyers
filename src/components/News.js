import React from 'react'
import Jang from "../assets/imgs/Jang.jpg"
import Dawn from "../assets/imgs/Dawn.jpg"
import CNN from "../assets/imgs/CNN.png"

export const News = () => {
    return (
        <div className="container">

            
            <div className="news">
             <h2 className="fw-bold">NEWS</h2>
             <p> E-Lawyers team is providing you the locally and internationally news resources in our plateform. 
             You can daily visit and read the news paper given bellow</p>
            </div>
            

            <div className="card-group">
  <div className="card">
    <img src={Jang} className="card-img-top" alt="Jang News"/>
    <div className="card-body">
      <h5 className="card-title">Daily Jang News</h5>
      <p className="card-text">The Daily Jang is an Urdu newspaper headquartered in Karachi, Pakistan. It is the oldest newspaper of Pakistan in continuous publication since its foundation in 1939. Its current group chief executive and editor-in-chief is Mir Shakil-ur-Rahman.
      </p>
      <a href="https://jang.com.pk/">Jump to Channel</a>
      
    </div>
  </div>
  <div className="card">
    <img src={Dawn} className="card-img-top" alt="Dawn News"/>
    <div className="card-body">
      <h5 className="card-title">Dawn News</h5>
      <p className="card-text">Dawn is the largest and oldest English-language newspaper in Pakistan and the country's newspaper of record. Dawn is the flagship publication of the Dawn Group of Newspapers, which also owns the information technology magazine Spider.</p>
      
      <a href="https://epaper.dawn.com/">Jump to Channel</a>
    </div>
  </div>
  <div className="card">
    <img src={CNN} className="card-img-top" alt="CNN News"/>
    <div className="card-body">
      <h5 className="card-title">CNN News</h5>
      <p className="card-text">The Cable News Network is a multinational news-based pay television channel headquartered in Atlanta, United States. It is owned by CNN Worldwide, a unit of the WarnerMedia News & Sports division of AT&T's WarnerMedia.</p>
      <a href="https://www.washingtonpost.com/search?query=news&btn-search=&facets=%7B%22time%22%3A%22all%22%2C%22sort%22%3A%22relevancy%22%2C%22section%22%3A%5B%5D%2C%22author%22%3A%5B%5D%7D">Jump to Channel</a>
    </div>
  </div>
</div>
            
        </div>
    )
}
