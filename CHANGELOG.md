# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2025-08-12

### Added
- **Technical Documentation**: A comprehensive `README.md` file detailing the project's features, technology stack, architecture, and component breakdown.
- **Changelog**: This `CHANGELOG.md` file to track the project's history and evolution.

## [1.2.0] - 2024-07-29

### Added
- **Color Palette Selector**: In the "Moving Stars" view, a new dropdown menu allows users to select from predefined color palettes ("Cosmic", "Sunset", "Ocean", "Monochrome") for the stars.

### Changed
- The star generation logic in `MovingStars.tsx` now uses the colors from the actively selected palette instead of a fixed, hardcoded array.

## [1.1.0] - 2024-07-28

### Added
- **Animated Nebulae**: Two large, colorful, and slowly drifting nebulae have been added to the "Milky Way" view, enhancing the background's visual appeal and dynamism.
- New CSS keyframe animations (`nebula-drift`) and styles were added to `index.html` to support the ethereal, gaseous effect.

## [1.0.0] - 2024-07-27

### Added
- **Initial Release**: The first version of the "React Moving Stars" application.
- **Three Visual Modes**:
  - `Moving Stars`: An interactive starfield simulation with user controls for speed and density.
  - `Milky Way`: A serene deep-space view with a parallax effect responsive to mouse movement.
  - `RuPaul`: A whimsical animated scene featuring RuPaul as an astronaut.
- **View Switcher**: A UI component to navigate between the three visual experiences.
- **Fullscreen Mode**: A global toggle button to enter and exit an immersive, fullscreen view.