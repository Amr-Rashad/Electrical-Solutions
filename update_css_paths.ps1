$files = Get-ChildItem -Path "." -Filter "*.html" -Recurse | Where-Object { $_.FullName -notlike "*\common\*" -and $_.FullName -notlike "*\components\*" }

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Calculate relative path to css directory based on file depth
    $depth = ($file.FullName.Split([IO.Path]::DirectorySeparatorChar)).Length - ($PWD.Path.Split([IO.Path]::DirectorySeparatorChar)).Length
    $cssPath = "../" * ($depth - 1) + "css/style.css?v=1"
    
    # Replace css path
    $content = $content -replace 'href="[^"]*css/style\.css[^"]*"', "href=`"$cssPath`""
    
    Set-Content -Path $file.FullName -Value $content
}
