$files = Get-ChildItem -Path "." -Filter "*.html" -Recurse | Where-Object { $_.FullName -notlike "*\common\*" -and $_.FullName -notlike "*\components\*" }

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Skip if file already has jQuery
    if ($content -match "jquery") {
        continue
    }
    
    # Calculate relative path to main.js based on file depth
    $depth = ($file.FullName.Split([IO.Path]::DirectorySeparatorChar)).Length - ($PWD.Path.Split([IO.Path]::DirectorySeparatorChar)).Length
    $mainJsPath = "../" * ($depth - 1) + "js/main.js"
    
    # Replace script section
    $content = $content -replace '(?s)(<!-- Scripts -->.*?<script src="https://cdn\.jsdelivr\.net/npm/bootstrap@.*?\.js"></script>)', @"
`$1
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="$mainJsPath"></script>
"@
    
    Set-Content -Path $file.FullName -Value $content
}
