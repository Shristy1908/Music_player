let previous= document.querySelector('#pre');
let play= document.querySelector('#play');
let next= document.querySelector('#next');
let title= document.querySelector('#title');
let recent_volume= document.querySelector('#volume');
let volume_show= document.querySelector('#volume_show');
let slider= document.querySelector('#duration_slider');
let show_duration= document.querySelector('#show_duration');
let track_image= document.querySelector('#track_image');
let auto_play= document.querySelector('#auto');
let present= document.querySelector('#present');
let total= document.querySelector('#total');
let artist= document.querySelector('#artist');

let timer;
let autoplay=0;

let index_no=0;
let playing_song=false;

//create a audio Element
let track=document.createElement('audio');

//All songs list
let All_song=[
    {
        name: "52 Gaj Ka Daman",
        path: "52 Gaj Ka Daman(PagalWorld.com.se).mp3",
        img: "https://i.pinimg.com/originals/cd/22/68/cd2268d9abe5917126c23a8ec731e689.jpg",
        singer: "Renuka Panwar"
    },
    {
        name: "Kal ho na ho",
        path: "03. kal ho na ho - Sad.mp3",
        img: "https://i.scdn.co/image/ab67616d0000b273a2055e0b847ff66fb5206099",
        singer: "Sonu Nigam"
    },
    {
        name: "Sajde",
        path: "Sajde (Khatta Meetha) - K.K - 320Kbps.mp3",
        img: "https://c-fa.cdn.smule.com/rs-s90/arr/d0/2d/1025553b-aa5d-468f-a1a2-d1658dc406da_1024.jpg",
        singer: "KK, Sunidhi chauhan"
    },
    {
        name: "Main-Yahaan-Hoon",
        path: "Main-Yahaan-Hoon-Udit-Narayan.m4a",
        img: "https://lh3.googleusercontent.com/proxy/j9vzyuOnq_YRgTRT8dkOw_72kYtq8yzXf2doe8Z2c8nbV8p2tk7DX-NbkP7cdE-aWMo_fjDjAnk7KeVo11sjdpqpvyFmELqFYsJsbLhEBs2fpcm7QDSP7w",
        singer: "Udit Narayan"
    },
    {
        name: "Dilliwali Girlfriend",
        path: "05 Dilliwaali Girlfriend (Yeh Jawaani Hai Deewani).mp3",
        img: "http://a10.gaanacdn.com/images/albums/20/93820/crop_480x480_93820.jpg",
        singer: "Arjit singh, Sunidhi chauhan"
    },
    {
        name: "Piya Ghar Aavenge",
        path: "06 - Piya Ghar Aavenge (PagalWorld.com).mp3",
        img: "https://thecrimsonbride.com/wp-content/uploads/2020/07/Swati-Kamlesh-Wedding-The-Crimson-Bride-3-1-768x530.png",
        singer: "Kailash kher"
    },
    {
        name: "Naino ki Jo Baat",
        path: "Naino Ki To Baat Naina Jane Hai.mp3",
        img: "https://a10.gaanacdn.com/gn_img/albums/jBr3gybR1m/Br3g7eMY3R/size_xxl.jpg",
        singer: "Prateeksha Srivastava, Chandra Surya"
    },
    {
        name: "Ja Re Ja o Harjai",
        path: "02. Ja Re Ja O Harjai.mp3",
        img: "https://m.media-amazon.com/images/I/81q3hWiRw8L._SS500_.jpg",
        singer: "Lata Mangeshkar"
    },
    {
        name: "Lukka chuppi",
        path: "05. Lukka Chuppi.mp3",
        img: "https://i.pinimg.com/originals/c3/4f/93/c34f93569226e9a3eaaa2d4200dbca9b.jpg",
        singer: "A. R. Rahman, Lata Mangeshkar"
    },
    {
        name: "Baharo Phol",
        path: "01. Baharo Phool Barsao.mp3",
        img: "https://upload.wikimedia.org/wikipedia/en/9/9f/Baharo_Phool_Barsao.jpg",
        singer: "Mohammed Rafi"
    }
];


//All function

//function load the track
function load_track(index_no){
    reset_slider();
    track.src=All_song[index_no].path;
    title.innerHTML=All_song[index_no].name;
    track_image.src=All_song[index_no].img;
    artist.innerHTML=All_song[index_no].singer;
    track.load();

    total.innerHTML=All_song.length;
    present.innerHTML=index_no+1;
    timer=setInterval(range_slider,1000)
}
load_track(index_no);


//reset song sider
function reset_slider(){
    slider.value=0;
}

//checking the song is playing or not
function justplay(){
    if(playing_song==false){
        playsong();
    }
    else{
        pausesong();
    }
}


//play song
function playsong(){
    track.play();
    playing_song=true;
    play.innerHTML='<i class="fa fa-pause"></i>';
}

//pause song
function pausesong(){
    track.pause();
    playing_song=false;
    play.innerHTML='<i class="fa fa-play"></i>';
}

//next song
function next_song(){
    if(index_no < All_song.length-1){
        index_no+=1;
        load_track(index_no);
        playsong();
    }
    else{
        index_no=0;
        load_track(index_no);
        playsong();
    }
}

//previous song
function previous_song(){
    if(index_no>0){
        index_no-=1;
        load_track(index_no);
        playsong();
    }
    else{
        index_no=All_song.length;
        load_track(index_no);
        playsong();
    }
}

//change volume
function volume_change(){
    volume_show.innerHTML=recent_volume.value;
    track.volume=recent_volume.value / 100;
}
 
//change slider position
function change_duration(){
    slider_position=track.duration*(slider.value/100);
    track.currentTime=slider_position;
}

//autoplay function
function autoplay_switch(){
    if(autoplay==1){
        autoplay=0;
        auto_play.style.background="rgba(255,255,255,0.2)";
    }
    else{
        autoplay=1;
        auto_play.style.background= "#FF8A65";
    }
}

function range_slider(){
    let position=0;
     
    //update slider position
    if(!isNaN(track.duration)){
        position=track.currentTime*(100/ track.duration);
        slider.value=position;
    }

    //function will run when the song is over
    if(track.ended){
        play.innerHTML='<i class="fa fa-play"></i>';
        if(autoplay==1){
            index_no+=1;
            load_track(index_no);
            playsong();
        }
    }
}
















