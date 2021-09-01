with import <nixpkgs> {};


stdenv.mkDerivation rec {
   name = "env";
   env = buildEnv { name = name; paths = buildInputs; };
   buildInputs = [
    
    (yarn.override { nodejs = nodejs-10_x; })
     nodejs-10_x
   ];
 }