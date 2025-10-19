param(
  [string] $Path = ".",
  [string] $Filter = "*.cs"
)

Write-Host "Watching path: $Path, filter: $Filter"

$fsw = New-Object System.IO.FileSystemWatcher $Path, $Filter -Property @{
  IncludeSubdirectories = $true
  NotifyFilter = [System.IO.NotifyFilters]::LastWrite -bor [System.IO.NotifyFilters]::FileName -bor [System.IO.NotifyFilters]::DirectoryName
}

$action = {
  Start-Sleep -Milliseconds 200
  $file = $Event.SourceEventArgs.FullPath
  try {
    # 示例修改：将 tab 替换为 4 个空格（修改前请备份或用 VCS）
    $text = Get-Content $file -Raw -ErrorAction Stop
    $new = $text -replace "`t", "    "
    if ($new -ne $text) {
      $new | Set-Content -Path $file -Force
      Write-Host "$(Get-Date -Format u): Fixed tabs in $file"
    }
  } catch {
    Write-Host "Error processing $file: $_"
  }
}

Register-ObjectEvent $fsw Changed -Action $action | Out-Null
Register-ObjectEvent $fsw Created -Action $action | Out-Null

Write-Host "Press Enter to stop watching..."
Read-Host | Out-Null

# 清理事件
Get-EventSubscriber | Unregister-Event
$fsw.Dispose()