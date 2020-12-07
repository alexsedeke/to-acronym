# to-acronym

[![Build Status](https://travis-ci.org/alexanderVu/to-acronym.svg?branch=main)](https://travis-ci.org/alexanderVu/to-acronym)

to-acronym analyzes a string that can consist of one or more words and tries to create a short and concise acronym. to-acronym was build to generate acronyms from company names to have concise acronym used as database keys. to-acronym has no package dependencies.

## Install

```bash
npm install to-acronym
```

## Usage

```javascript
const { acronym } = require('to-acronym')

const myAcronym = acronym('IBM Services')
// returns IBMS
const wordAcronym = acronym('System')
// returns STM
```

## About

to-acronym tries to keep the formed acronym as short as possible. Therefore there is a prioritization within the individual words. Words that start with capital letters have a higher priority than those with lower case. If a specified length is exceeded, words are only used with high priority.

to-acronym also tries to filter out acronyms within the input. This is only possible if you pay attention to upper and lower case. As an example, in 'GE Green Planet' the acronym 'GE' for 'General Electrics' is recognized as an acronym based on the spelling.

Below are a few examples and their formed acronym.

- GE Green Planet Develoment -> **GEGPD**
- GE Green for Planet -> **GEGPD**
- Charles and Antony -> **CAA**
- System -> **STM**
