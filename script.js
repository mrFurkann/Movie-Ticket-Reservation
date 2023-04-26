const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');  //Bütün Koltuk Bilgilerini Alıyoruz.


// Sayfa Yuklendiğinde Yapmasını İstediğimiz Function'ları Ekledik.
getFromLocalStroge(); //Bilgileri Alıp Uygulama Üzerine Dağıtma İşlemi Yapılır.
calculateTotal(); //Hesaplama İşlemi Yapılır



container.addEventListener('click', function(e){  
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved') ){     //Burada sadece seat class ına ait elemanaları console.logda görmek için bir filtreleme yaptık
        e.target.classList.toggle('selected');   //.toogle: Html öğesi görünür durumdaysa gizlemeyi, gizli durumdaysa görünür hale getirmemizi sağlar.
        calculateTotal();
       

    } 
});

select.addEventListener('change', function(e){  // Farklı Film Seçtiğimizde Fiyatı Güncellemek için Yapıldı.
    calculateTotal();
});

function calculateTotal() {  

    const selectedSeats = container.querySelectorAll('.seat.selected');
     
    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function(seat){   //selectedSeats içerisindeki bütün elemanaları dönüyoruz her bir eleman Seats içerisine teker teker kopyalanıyor. Oluşturmuş olduğumuz array listesi üzerine de gelen her bir eleman tek tek eklenıyor. 
        selectedSeatsArr.push(seat);
    });
     
    // spread

    seats.forEach(function(seat){ //Burada ekliyoruz.
        seatsArr.push(seat);
    })

    // LocalStroge içerisindeki saklıyacağımız index listesini oluşturma.

    // [1,3,5] gibi

    let selectedSeatIndexs = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    })

    console.log(selectedSeatIndexs);




    let selectedSeatCount = selectedSeats.length;  // Eleman sayısını aldık
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    //LocalStroge İçerisine Kayıt Etme

    saveToLocalStroge(selectedSeatIndexs);

}





function saveToLocalStroge(indexs) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexs)); // Seçmiş Olduğumuz Koltuk Bilgisini LocalStroge'a Kaydediyor.
    localStorage.setItem('selectedMovieIndex', select.selectedIndex) // Seçmiş Olduğumuz Film Bilgisini LocalStroge'a Kaydediyor.


}


// LocalStroge'den Bilet Bilgilerinin Alınması
 
function getFromLocalStroge() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats != null && selectedSeats.length > 0) {   // Sayfa Yeniden Başlatıldığında Önceden Seçili Olan Koltukların Bilgileri Kayıtlı Kalır.
        seats.forEach(function(seat, index) {
            if (selectedSeats.indexOf(index) > -1) {  // 0 indexde koltuk sayısı olduğu için -1 den buyuk yazdık
                seat.classList.add('selected');
            }
        });
    }


    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex != null){  //Sayfa Yeniden Başlatıldığında Önceden Seçili Olan Movie(1,2,3) Kalır. Bu Sayede Önceden Seçilmiş Movie Görünür.
        select.selectedIndex = selectedMovieIndex; 
    }
}