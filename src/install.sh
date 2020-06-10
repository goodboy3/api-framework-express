
#文件绝对路径
filePath_abs=$(readlink -f "$0")
#文件所在文件夹的绝对路径
path_dir=$(dirname $filePath_abs)

echo $filePath_abs
echo $path_dir