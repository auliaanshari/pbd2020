window.onload=init;
var infoDua = [];
var markers = [];
var markersDua = [];
var markersDua1 = [];
var circles=[];
var angkot = [];
var jalurAngkot=[];
var rute = [];  //NAVIGASI
var pos ='null';
var infowindow;
var centerBaru;
var centerLokasi;
var fotosrc = 'foto/';
var directionsDisplay;
var marker_1 = []; //MARKER UNTUK POSISI SAAT INIvar marker_2 = []; //MARKER UNTUK POSISI SAAT INI
var marker_2 = [];
var awal = 0;
var tujuan = 0;
var server = "";

var cekRadiusStatus = "off";
function init(){
    basemap();
	shelterTampil();
    kecamatanTampil();
}

function basemap() {
    google.maps.visualRefresh = true;
    map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: new google.maps.LatLng(-0.914813, 100.458801),
          mapTypeId: google.maps.MapTypeId.ROADMAP
    });
};

function kecamatanTampil()
  {
    kecamatan = new google.maps.Data();
    kecamatan.loadGeoJson(server+'kecamatan.php');
    kecamatan.setStyle(function(feature)
    {
      var idkec = feature.getProperty('id_kecamatan');
      if (idkec == 'K001'){ color = '#ff71ce'
        return({
      fillColor:color,
          strokeWeight:1.5,
          strokeColor:'black',
          fillOpacity:0.25,
          clickable: false
        });
    }
      else if(idkec == 'K002'){ color = '#01cdfe'
        return({
        fillColor:color,
          strokeWeight:1.5,
          strokeColor:'black',
          fillOpacity:0.25,
          clickable: false
        });
    }
      else if(idkec == 'K003'){ color = '#b967ff'
        return({
        fillColor:color,
          strokeWeight:1.5,
          strokeColor:'black',
          fillOpacity:0.25,
          clickable: false
        });

    }
    else if(idkec == 'K004'){ color = '#fffb96'
        return({
        fillColor:color,
          strokeWeight:1.5,
          strokeColor:'black',
          fillOpacity:0.25,
          clickable: false
        });

    }
    else if(idkec == 'K005'){ color = '#d11141'
        return({
        fillColor:color,
          strokeWeight:1.5,
          strokeColor:'black',
          fillOpacity:0.25,
          clickable: false
        });

    }
    else if(idkec == 'K006'){ color = '#ffc425'
        return({
        fillColor:color,
          strokeWeight:1.5,
          strokeColor:'black',
          fillOpacity:0.25,
          clickable: false
        });

    }
    else if(idkec == 'K007'){ color = '	#fb2e01'
        return({
        fillColor:color,
          strokeWeight:1.5,
          strokeColor:'black',
          fillOpacity:0.25,
          clickable: false
        });

    }
    else if(idkec == 'K008'){ color = '	#7289da'
        return({
        fillColor:color,
          strokeWeight:1.5,
          strokeColor:'black',
          fillOpacity:0.25,
          clickable: false
        });

    }
    else if(idkec == 'K009'){ color = '#3c67ff'
        return({
        fillColor:color,
          strokeWeight:1.5,
          strokeColor:'black',
          fillOpacity:0.25,
          clickable: false
        });

    }
    else if(idkec == 'K010'){ color = '#272b4b'
        return({
        fillColor:color,
          strokeWeight:1.5,
          strokeColor:'black',
          fillOpacity:0.25,
          clickable: false
        });

    }
    else if(idkec == 'K011'){ color = '#a0d4d8'
        return({
        fillColor:color,
          strokeWeight:1.5,
          strokeColor:'black',
          fillOpacity:0.25,
          clickable: false
        });

    }
    });
    kecamatan.setMap(map);
  }

function shelterTampil()
  {
          shel = new google.maps.Data();
          shel.loadGeoJson(server+'shelter.php');
          shel.setStyle(function(){
          return({
                  fillColor: '#ff6d01',
                  strokeColor: 'black',
                  strokeWeight: 0.5,
                  fillOpacity: 7
                 });
            });
          shel.setMap(map);
      }

      function aktifkanGeolocation(){ //posisi saat ini

        navigator.geolocation.getCurrentPosition(function(position) {
         hapusMarkerInfowindow();
         hapusInfo();
          pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude

          };console.log(pos.lat);
            marker = new google.maps.Marker({
          position: pos,
          map: map,
          animation: google.maps.Animation.DROP,
          });
          centerLokasi = new google.maps.LatLng(pos.lat, pos.lng);
          markers.push(marker);
          infowindow = new google.maps.InfoWindow({
          position: pos,
          content: "<a style='color:black;'>You Are Here</a> "
          });
          infowindow.open(map, marker);
          map.setCenter(pos);
        });
      }

      function manualLocation(){ //posisi manual
        hapusRadius();
        alert('Click the map');
        map.addListener('click', function(event) {
          addMarker(event.latLng);
          });
        }
      
          function addMarker(location){
          hapusposisi();
          marker = new google.maps.Marker({
            position : location,
            map: map,
            animation: google.maps.Animation.DROP,
            });
          pos = {
            lat: location.lat(), lng: location.lng()
          }
          centerLokasi = new google.maps.LatLng(pos.lat, pos.lng);
          markers.push(marker);
          infowindow = new google.maps.InfoWindow();
          infowindow.setContent('Current Position');
          infowindow.open(map, marker);
          usegeolocation=true;
          google.maps.event.clearListeners(map, 'click');
          console.log(pos);
      
      }

      function cek()
        {
         document.getElementById('km').innerHTML=document.getElementById('inputradiusmes').value*100
        }

        function aktifkanRadius(){ 
            if (pos == 'null'){
            alert ('Click button current position or manual position first !');
            }
            else {
            hapusRadius();
            var inputradiusmes=document.getElementById("inputradiusmes").value;
            console.log(inputradiusmes);
            var circle = new google.maps.Circle({
              center: pos,
              radius: parseFloat(inputradiusmes*100),
              map: map,
              strokeColor: "blue",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "blue",
              fillOpacity: 0.35
              });
              map.setZoom(14);
              map.setCenter(pos);
              circles.push(circle);
            }
            cekRadiusStatus = 'on';
            shelterradius();
          }

          function hapusInfo() {
            for (var i = 0; i < infoDua.length; i++) {
                  infoDua[i].setMap(null);
                  }
          }
    
          function hapusRadius(){
            for(var i=0;i<circles.length;i++)
                         {
                             circles[i].setMap(null);
                         }
              circles=[];
            cekRadiusStatus = 'off';
            }
    
            function hapusposisi(){
                for (var i = 0; i < markers.length; i++){
                  markers[i].setMap(null);
                }
                markers = [];
              }

          function hapusMarkerInfowindow(){
            setMapOnAll(null);
            hapusMarkerTerdekat();
            pos = 'null';
       }

       function hapusMarkerTerdekat() {
        for (var i = 0; i < markersDua.length; i++) {
              markersDua[i].setMap(null);
          }
      }

       function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        }
       }

       function tampilsemua(){

        $.ajax({ url: server+'carishelter.php', data: "", dataType: 'json', success: function (rows){
          cari_shelter(rows);
        }});
      }

      function cari_shelter(rows)
  {
        $('#hasilcari1').show();
        $('#hasilcari').empty();
        hapusInfo();
        // clearroute2();
	    // clearroute();
	    hapusRadius();
        hapusMarkerTerdekat();
            if(rows==null)
            {
              alert('Shelter Not found');
            }
        for (var i in rows)
            {
              var row     = rows[i];
              var id   = row.id_shelter;
              var nama   = row.nama_shelter;
              var latitude  = row.latitude ;
              var longitude = row.longitude ;
              centerBaru = new google.maps.LatLng(latitude, longitude);
              marker = new google.maps.Marker
            ({
              position: centerBaru,
              icon:'assets/ico/meetups.png',
              map: map,
              animation: google.maps.Animation.DROP,
            });
            console.log(id);
              console.log(latitude);
              console.log(longitude);
              markersDua.push(marker);
              map.setCenter(centerBaru);
			  klikInfoWindow(id);
              map.setZoom(14);
              $('#hasilcari').append("<tr><td>"+nama+"</td><td><a role='button' title='info' class='btn btn-default fa fa-info' onclick='detailshelter(\""+id+"\");info1();'></a></td><td><a role='button' class='btn btn-default fa fa-bus' title='jalur angkot' onclick='angkotmesjid(\""+id+"\",\""+latitude+"\",\""+longitude+"\");info12();'></a></td></tr>");
            }
            }

            function klikInfoWindow(id)
            {
                google.maps.event.addListener(marker, "click", function(){
                 detailshel_infow(id);

                });

}
            

            function detailshelter(id1){

                $('#info').empty();
                 hapusInfo();
                    // clearroute2();
                    // clearroute();
                    hapusMarkerTerdekat();
                 console.log("hiaiii");
                     $.ajax({
                    url: server+'detailshelter.php?cari='+id1, data: "", dataType: 'json', success: function(rows)
                      {
                        console.log(id1);
                       for (var i in rows.data)
                        {
                          console.log('dd');
                          var row = rows.data[i];
                          var id = row.id_shelter;
                          var nama = row.nama_shelter;
                          var kapasitas_shelter=row.kapasitas_shelter;
                          var nama_desa=row.nama_desa;
                          var nama_kecamatan=row.nama_kecamatan;
                          var latitude  = row.latitude;
                          var longitude = row.longitude ;
                          centerBaru = new google.maps.LatLng(row.latitude, row.longitude);
                          marker = new google.maps.Marker
                          ({
                            position: centerBaru,
                            icon:'assets/ico/meetups.png',
                            map: map,
                            animation: google.maps.Animation.DROP,
                          });
                            console.log(latitude);
                            console.log(longitude);
                            markersDua.push(marker);
                          map.setCenter(centerBaru);
                          map.setZoom(18);
                          $('#info').append("<tr><td><b>Nama</b></td><td>:</td><td> "+nama+"</td></tr><tr><td><b>Kapasitas</b></td><td>:</td><td>"+kapasitas_shelter+" Jiwa</td></tr><tr><td><b>Desa</b></td><td>:</td><td> "+nama_desa+"</td></tr><tr><td><b>Kecamatan</b></td><td>:</td><td> "+nama_kecamatan+"</td></tr><tr><td><a class='btn btn-default' role=button' data-toggle='collapse' href='#terdekat1' onclick='tampil_sekitar(\""+latitude+"\",\""+longitude+"\",\""+nama+"\")' title='Nearby' aria-controls='Nearby'><i class='fa fa-compass' style='color:black;''></i><br><input  type='range' onchange='cek1();aktifkanRadiusSekitar();resultt1();info1();' id='inputradius1' name='inputradius1' data-highlight='true' min='1' max='15' value='1' ></div></div></td></tr>")
                           infowindow = new google.maps.InfoWindow({
                          position: centerBaru,
                          content: "<span style=color:black><center><b>Information</b><br><img src='"+fotosrc+image+"' alt='image in infowindow' width='150'></center><br><i class='fa fa-home'></i> "+nama+"<br><i class='fa fa-map-marker'></i> "+alamat+"<br><a role='button' title='tracking' class='btn btn-default fa fa-car' value='Route' onclick='callRoute(centerLokasi, centerBaru);rutetampil();resetangkot();'></a>&nbsp<a role='button' title='gallery' class='btn btn-default fa fa-picture-o' value='Gallery' onclick='galeri(\""+id+"\")'></a></span>",
                          pixelOffset: new google.maps.Size(0, -33)
                          });
                        infoDua.push(infowindow);
                        hapusInfo();
                        infowindow.open(map);

                        var isi="<br><b style='margin-left:20px'>Fasilitas</b> <br><ol>";
                        for (var i in rows.fasilitas_shelter){
                          var row = rows.fasilitas_shelter[i];
                          var id_fasilitas = row.id_fasilitas;
                          var name = row.fasilitas;
                          console.log(name);
                          isi = isi+"<li>"+name+"</li>";
                        }//end for
                        isi = isi + "</ol>";
                        $('#info').append(isi);
              
                        //end for
                        isi = isi + "</ol>";
                        $('#info').append(isi);
              
              
              
                        }
              
              
                      }


                    });     
              }

              function detailshel_infow(id){ 

                $('#info').empty();
                 hapusInfo();
                    // clearroute2();
                    // clearroute();

                     $.ajax({
                    url: server+'detailshelter1.php?cari='+id, data: "", dataType: 'json', success: function(rows)
                      {
                       console.log("hiaiii");
                        console.log(id);
                       for (var i in rows)
                        {
              
                          console.log('dd');
                          var row = rows.data[i];
                          var id = row.id_shelter;
                          var nama = row.nama_shelter;
                          var kapasitas_shelter=row.kapasitas_shelter;
                          var nama_desa=row.nama_desa;
                          var nama_kecamatan=row.nama_kecamatan;
                          var latitude  = row.latitude;
                          var longitude = row.longitude ;
                          centerBaru = new google.maps.LatLng(row.latitude, row.longitude);
                          marker = new google.maps.Marker
                          ({
                            position: centerBaru,
                            icon:'assets/ico/meetups.png',
                            map: map,
                            animation: google.maps.Animation.DROP,
                          });
                            console.log(latitude);
                            console.log(longitude);
                            markersDua.push(marker);
                          map.setCenter(centerBaru);
                          map.setZoom(18);
                          infowindow = new google.maps.InfoWindow({
                          position: centerBaru,
                          content: "<span style=color:black><center><b>Information</b><br><i class='fa fa-home'></i> "+nama_shelter+"<br><i class='fa fa-map-marker'></i> "+nama_desa+", "+nama_kecamatan+"<br><a role='button' title='tracking' class='btn btn-default fa fa-car' value='Route' onclick='callRoute(centerLokasi, centerBaru);rutetampil()'></a></span>",
                          pixelOffset: new google.maps.Size(0, -33)
                          });
                        infoDua.push(infowindow);
                        hapusInfo();
                        infowindow.open(map);
              
                        }
              
              
                      }
                    });
              }

              function info1(){
                $("#infoo").show();
                $("#att2").hide();
                $("#radiuss").hide()
                $("#infoo1").hide();;
              
                $("#infoev").hide();
              }

              function resultt(){
                $("#result").show();
                $("#resultaround").hide();
                $("#infoo").hide();
                $("#att1").hide();
                $("#hide2").show();
                $("#showlist").hide();
                $("#radiuss").hide();
                $("#infoo1").hide();
                $("#att2").hide();
                $("#infoev").hide();
              }


        //   function shelterradius(){ 

        //     $('#hasilcari1').show();
        //     $('#hasilcari').empty();
        //       hapusInfo();
        //     // //   clearroute2();
        //     // //   clearroute();
        //     // //   hapusMarkerTerdekat();
        //     //   cekRadius();
        //       console.log(pos.lat);
        //       console.log(pos.lng);
        
        //         $.ajax({
        //         url: server+'masjidradius.php?lat='+pos.lat+'&lng='+pos.lng+'&rad='+rad, data: "", dataType: 'json', success: function(rows)
        //         {
        //             console.log("hy");
        //             for (var i in rows)
        //             {
        //               var row     = rows[i];
        //               var id   = row.id;
        //               var nama   = row.name;
        //               var latitude  = row.latitude ;
        //               var longitude = row.longitude ;
        //               centerBaru = new google.maps.LatLng(latitude, longitude);
        //               marker = new google.maps.Marker
        //             ({
        //               position: centerBaru,
        //               icon:'assets/ico/marker_masjid.png',
        //               map: map,
        //               animation: google.maps.Animation.DROP,
        //             });
        //               console.log(latitude);
        //               console.log(longitude);
        //               markersDua.push(marker);
        //               map.setCenter(centerBaru);
        //               klikInfoWindow(id);
        //               map.setZoom(14);
        //               $('#hasilcari').append("<tr><td>"+nama+"</td><td><a role='button' title='info' class='btn btn-default fa fa-info' onclick='detailmasjid(\""+id+"\");info1();'></a></td><td><a role='button' class='btn btn-default fa fa-bus' title='jalur angkot' onclick='angkotmesjid(\""+id+"\",\""+latitude+"\",\""+longitude+"\");info12();'></a></td></tr>");
        //             }
        //             }
        //           });
       