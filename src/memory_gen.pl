# EXECUCAO DO GERADOR DE MEMORIA PRINCIPAL:
# perl arquivo.pl TAMANHO_MEMORIA
# ex.: perl arquivo.pl 256kb



#GERADOR DE TESTCASES
sub dec2bin {
    my $str = unpack("B32", pack("N", shift));
   # $str =~ s/^0+(?=\d)//;   # otherwise you'll get leading zeros
    return $str;
}
	


if ($ARGV[0] ne "") {

	$path_memory_size = shift;

}

else {
	print "ERROR\n";
	exit;
}

@values = split(/K|k|M|m/, $path_memory_size);

if($values[1] eq KB){

	$grandeza = 1024;

}

else{

	$grandeza = 1024*1024;

}

$memory_size = $grandeza * $values[0];

open( FILE_MEMORY, "assets/main_memory.txt" );

for($i=0;$i<=$memory_size;$i++){

	$aux = sprintf("%08x\n",$i);
	print FILE_MEMORY "$aux";

}

close(FILE_MEMORY);