
<?php
require 'connect.php';

if(isset($_GET["cari_nama"])){
  $cari_nama = $_GET["cari_nama"];
}else{
  $cari_nama = "";
}


$querysearch	=" 	SELECT distinct a.id_shelter,a.nama_shelter, a.kapasitas_shelter,ST_X(ST_Centroid(a.geom)) AS longitude, ST_Y(ST_CENTROID(a.geom)) As latitude
					FROM shelter as a where upper(a.nama_shelter) like upper('%$cari_nama%')
				";

$hasil=pg_query($querysearch);
while($row = pg_fetch_array($hasil))
    {
          $id_shelter=$row['id_shelter'];
          $nama_shelter=$row['nama_shelter'];
          $kapasitas_shelter=$row['kapasitas_shelter'];
          $longitude=$row['longitude'];
          $latitude=$row['latitude'];
          $dataarray[]=array('id_shelter'=>$id_shelter,'nama_shelter'=>$nama_shelter, 'kapasitas_shelter'=>$kapasitas_shelter, 'longitude'=>$longitude,'latitude'=>$latitude);
    }
echo json_encode ($dataarray);
?>
