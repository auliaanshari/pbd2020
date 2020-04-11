<?php
require 'connect.php';
$cari = $_GET["cari"];
$querysearch ="select distinct shelter.id_shelter, shelter.nama_shelter, kapasitas_shelter, desa.nama_desa, kecamatan.nama_kecamatan,
				ST_X(ST_Centroid(shelter.geom)) AS lng, ST_Y(ST_CENTROID(shelter.geom)) As lat from shelter 
				left join detail_shelter on detail_shelter.id_shelter=shelter.id_shelter 
				join kajian_bencana on kajian_bencana.id_desa=detail_shelter.id_desa
				join desa on kajian_bencana.id_desa=desa.id_desa
				join kecamatan on kecamatan.id_kecamatan=desa.id_kecamatan where shelter.id_shelter='$cari'";
$hasil=pg_query($querysearch);
$dataarray = [];
$data_fasilitas = [];
while($row = pg_fetch_array($hasil))
	{
		  $id_shelter=$row['id_shelter'];
		  $nama_shelter=$row['nama_shelter'];
		  $kapasitas_shelter=$row['kapasitas_shelter'];
		  $nama_desa=$row['nama_desa'];
		  $nama_kecamatan=$row['nama_kecamatan'];
		  $longitude=$row['lng'];
		  $latitude=$row['lat'];
		  $dataarray[]=array('id_shelter'=>$id_shelter,'nama_shelter'=>$nama_shelter,'kapasitas_shelter'=>$kapasitas_shelter,'nama_desa'=>$nama_desa, 'nama_kecamatan'=>$nama_kecamatan,'longitude'=>$longitude,'latitude'=>$latitude);
	}

	 //DATA FASILITAS
    $query_fasilitas="SELECT fasilitas_shelter.id_fasilitas, fasilitas_shelter.fasilitas FROM fasilitas_shelter left join detail_fasilitas_shelter on detail_fasilitas_shelter.id_fasilitas = fasilitas_shelter.id_fasilitas left join shelter on shelter.id_shelter = detail_fasilitas_shelter.id_shelter where shelter.id_shelter = '".$cari."' ";
    $hasil3=pg_query($query_fasilitas);
    while($baris = pg_fetch_array($hasil3)){
        $id_fasilitas=$baris['id_fasilitas'];
        $nama_fasilitas=$baris['fasilitas'];
        $data_fasilitas[]=array('id_fasilitas'=>$id_fasilitas,'fasilitas'=>$nama_fasilitas);
    }
	$arr=array("data"=>$dataarray, "fasilitas_shelter"=>$data_fasilitas);
    echo json_encode($arr);
?>
