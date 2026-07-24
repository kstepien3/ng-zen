Output demo.gif

Require ng

Set Shell zsh
Set WindowBar Colorful
Set Theme "tokyonight-storm"
Set Margin 0
Set BorderRadius 0
Set Width 800
Set Height 400
Set Padding 20
Set FontSize 18
Set TypingSpeed 60ms

Sleep 1s
Type "ng generate @ng-zen/cli:ui"
Sleep 500ms
Enter

# Wait for the interactive mode to load
Sleep 1s

# Select the Button component
Down 3
Sleep 400ms
Space

# Scroll down to reveal more components
Sleep 600ms
PageDown 1
Sleep 600ms

# Select a component near the bottom
Down 5
Sleep 400ms
Space

Sleep 2s
Enter

# Wait for files to be generated (CREATE logs)
Sleep 7s
