<?php
include('connect.php');
$latit=$_GET["lat"];
$longi=$_GET["lng"];
$rad=$_GET["rad"];

$querysearch="SELECT id_shelter, nama_shelter,st_x(st_centroid(geom)) as lng,st_y(st_centroid(geom)) as lat,
	CAST(ST_DistanceSpheroid(ST_GeomFromText('POINT($longi $latit)',-1),ST_Centroid(shelter.geom),'SPHEROID[\"WGS 84\",6378137,298.257223563]') As numeric) as jarak
	FROM shelter where CAST(ST_DistanceSpheroid(ST_GeomFromText('POINT($longi $latit)',-1),ST_Centroid(shelter.geom),'SPHEROID[\"WGS 84\",6378137,298.257223563]') As numeric) <= ".$rad." ORDER BY jarak
			 ";
$hasil=pg_query($querysearch);
while($row = pg_fetch_array($hasil))
	{
		  $id_shelter=$row['id_shelter'];
		  $nama_shelter=$row['nama_shelter'];
		  $longitude=$row['lng'];
		  $latitude=$row['lat'];
		  $dataarray[]=array('id_shelter'=>$id_shelter,'nama_shelter'=>$nama_shelter,
		  'longitude'=>$longitude,'latitude'=>$latitude);
	}
echo json_encode ($dataarray);
?>
