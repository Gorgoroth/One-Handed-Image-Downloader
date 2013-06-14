# One-Handed Image Downloader
## A mouseless, fast & easy way to save pictures from any website
This is a work in progress

### Intention
This chrome extension should work like this:

It should allow for a VIM like one-handed, home row operation so you can browse and save pictures while stirring your coffee, petting your cat or whatever, I'm not here to judge.

1. Namely, activate extension via shortcut, e.g. CTRL + SHIFT + S
2. Handle Image Download
    * If there's only one big image, open file download dialog
    * else display overlay with thumbs of available images, each with size information, press a to save all, 1 for the first, 2 for the second etc.
3. ???
4. Profit

#### Initial planed features

##### Done
* Keyboard shortcut to activate extension
* Saving of first or only image
* If more than one image, show overlay of available images
* Close overlay if Ctrl + Shift + X
* Save selected images from overlay

##### Todo
* Save all images from overlay
* Refine which image sizes should be downloaded
* Close overlay if click on blank area

#### Future possible features

* Have an option to save on https, too
* Have an option to customize keys
* Have an option to black list urls
* Have option to either white list url access
* Let user customize minimum image sizes for saving (pixel size and disk space)
* Follow link on thumbs on page and save full sized images
    This means, if link target is image, save, if not image, save biggest image
