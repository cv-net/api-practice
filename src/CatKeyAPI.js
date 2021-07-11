import { React, useState, useEffect } from 'react';

export default function DogAPI(props) {
    const [imageUrls, saveUrls] = useState([])

    useEffect(async()=>{ // useEffect has to be the async function, can't export it to another
        await fetch(`https://api.thecatapi.com/v1/images/search?limit=${props.num}`, {
            'x-api-key': process.env.CAT_KEY // header for api key, stored with
        }).then(response => response.json())
        .then(res => { // have to do this work in here
            let data = res.map((data)=>{
                return {
                    url: data.url,
                    id: data.id
                }
            });
            console.log(data);
            saveUrls(data);
        })
        .catch((err) => console.log(err));
    }, []);

    return(
        <div>
            <h1>the world is yours</h1>
            <h3>here are some camps</h3>
            <ImgCards urls={imageUrls}/>
        </div>
    );
};

function ImgCards(props) {
    let cards = props.urls.map((cat)=> // map to a component, save it to a variable, return (render) the list of components
        <Card id={cat.id.toString()} url={cat.url} />
    );

    return(
        <div className='cards'>
            {cards}
        </div>
    );
};

function Card(props) {
    return(    
        <div className='card' key={props.id}>
            <h4>#</h4>
            <p>
                <img src={props.url} />
            </p>    
        </div>
    );
};

