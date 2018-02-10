# Arch Encrypted Install
I was looking for guides that installs arch with UEFI and an encrypted lvm partition. 

This is just rough commands I ended up running while installing. I would like to take the time to explain each step thoroughly. Ultimately, I would like to just convert this to a script.

### Bootable USB
`todo` firgure out commands

### Partition Setup
First I would run shred on the hard drive. `Todo - get command`

Create Partitions using GPT
```
gdisk /dev/sda
> 0
> n
> 1024 MiB
> ef00 #efi
> n
> max size
> 8e00 #lvm
```
Format boot parition
```
mkfs.fat -F32 /dev/sda1
```
Create encrypted lvm partitions
```
cryptsetup luksFormat /dev/sda2
> YES
> password

cryptsetup open --type luks /dev/sda2 cryptlvm
> password

pvcreate /dev/mapper/cryptlvm
vgcreate cryptvol /dev/mapper/cryptlvm
lvcreate -L8G cryptvol -n swap
lvcreate -L10G cryptvol -n root
lvcreate - 100%FREE cryptvol -n home
```
Format lvm paritions
```
mkswap /dev/mapper/cryptvol-swap
mkfs.ext4 /dev/mapper/cryptvol-root
mkfs.ext4 /dev/mapper/cryptvol-home
```
Mount partitions to begin bootstrapping arch
```
mount /dev/mapper/cryptvol-root /mnt
mkdir /mnt/home
mkdir /mnt/boot
mount /dev/mapper/cryptvol-home /mnt/home
mount /dev/sda1 /mnt/boot
swapon /dev/mapper/cryptvol-swap
```
Install arch with desired base packages
```
pacstrap /mnt base base-devel vim
# Generate fstab
genfsab -p /mnt >> /mnt/etc/fstab
```
chroot into arch
```
arch-chroot /mnt
```
Setup all basic things
```
ln -s /user/share/zoneinfo/America/New_York
hwclock --systohc  --utc
passwd #root password

vim /etc/locale.gen
# uncomment en_US.UFT-8 UFT-8 and en_US ISO-8859-1
locale-gen
locale > /etc/locale.conf
vim /etc/hostname
# Set desired hostname

vim /etc/mkinitcpio.conf
# add "keyboard encrypt lvm" before filesystem on line with HOOKS
mkinitcpio -p linux

bootctl --path=/boot/ install
vim /boot/loader/loader.conf
> default arch
> timeout 3
> editor 0

vim /boot/loader/entries/arch.conf
> title Arch Linux
> linux /vmlinuz-linux
> initrd /initramfs-linux.img
> options cryptdevice=UUID=######:cryptvol root=/dev/mapper/cryptvol-root quiet rw
# to get UUID in vim using command `:read ! blkid /dev/sda2`
```
Now reboot and hope I copied everything into the doc correctly and have no missed steps. `todo verify` 
