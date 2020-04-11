<?php
require 'connect.php';
$cari = ["cari"];
$querysearch ="select distinct shelter.id_shelter, shelter.nama_shelter, kapasitas_shelter, desa.nama_desa, kecamatan.nama_kecamatan,
				ST_X(ST_Centroid(shelter.geom)) AS lng, ST_Y(ST_CENTROID(shelter.geom)) As lat from shelter 
				left join detail_shelter on detail_shelter.id_shelter=shelter.id_shelter 
				join kajian_bencana on kajian_bencana.id_desa=detail_shelter.id_desa
				join desa on kajian_bencana.id_desa=desa.id_desa
				join kecamatan on kecamatan.id_kecamatan=desa.id_kecamatan where shelter.id_shelter='$cari'";

$hasil=pg_query($querysearch);
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
echo json_encode ($dataarray);
?>
