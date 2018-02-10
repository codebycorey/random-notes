# Fonts

The guide I followed was over a year old and I don't fully understand the changes yet. I plan to spend time eventually learned what each of these settings do.

### Install fonts
I didn't do research on fonts I like but this is pretty much what I am using at the moment.
```
sudo pacman -S ttf -dejavu ttf-liberation noto-fonts
```
### Font presets
Setting some font presets to make fonts render differently using symlinks.

* Disables embedded bitmap fonts. 
* Enabules sub-pxel RGB renderering. 
* Enables the LCD filter
  * Reduce color fringing when subpixel rendering is enabled
```
sudo ln -s /etc/fonts/conf.avail/70-no-bitmaps.conf /etc/fonts/conf.d
sudo ln -s /etc/fonts/conf.avail/10-sub-pixel-rgb.conf /etc/fonts/conf.d
sudo ln -s /etc/fonts/conf.avail/11-lcdfilter-default.conf /etc/fonts/conf.d
```

### Font Config
Maps fonts with font config. 

`/etc/fonts/local.conf`
```xml
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
    <match>
        <edit mode="prepend" name="family"><string>Noto Sans</string></edit>
    </match>
    <match target="pattern">
        <test qual="any" name="family"><string>serif</string></test>
        <edit name="family" mode="assign" binding="same"><string>Noto Serif</string></edit>
    </match>
    <match target="pattern">
        <test qual="any" name="family"><string>sans-serif</string></test>
        <edit name="family" mode="assign" binding="same"><string>Noto Sans</string></edit>
    </match>
    <match target="pattern">
        <test qual="any" name="family"><string>monospace</string></test>
        <edit name="family" mode="assign" binding="same"><string>Noto Mono</string></edit>
    </match>
</fontconfig>
```