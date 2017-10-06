# Things to install on new server
Plan on turning into a script





## Desktop Management
If I plan on installing window management on server

sudo apt install xinit
### i3

Dependencies
```
sudo apt install libxcb1-dev libxcb-keysyms1-dev libpango1.0-dev libxcb-util0-dev libxcb-icccm4-dev libyajl-dev libstartup-notification0-dev libxcb-randr0-dev libev-dev libxcb-cursor-dev libxcb-xinerama0-dev libxcb-xkb-dev libxkbcommon-dev libxkbcommon-x11-dev autoconf libxcb-xrm0 libxcb-xrm-dev automake
```
Actually Installing
```
cd /path/where/you/want/the/repository

# clone the repository
git clone https://www.github.com/Airblader/i3 i3-gaps
cd i3-gaps

# compile & install
autoreconf --force --install
rm -rf build/
mkdir -p build && cd build/

# Disabling sanitizers is important for release versions!
# The prefix and sysconfdir are, obviously, dependent on the distribution.
../configure --prefix=/usr --sysconfdir=/etc --disable-sanitizers
make
sudo make install
```
Things to install after
```
sudo apt install dmenu rofi i3status i3blocks
```

#### Third Parties
* ubuntu-extras `sudo apt install ubuntu-restricted-extras`
* audio `sudo apt install pavucontrol`
* file-manager `sudo apt install nautilus`
