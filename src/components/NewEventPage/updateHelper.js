import xml2js from 'xml2js';

const readAsync = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    }
    reader.onerror = (err) => {
      reject(err);
    }
    reader.readAsText(blob);
  });
}

const convertXmlAsync = (xml) => {
  return new Promise((resolve, reject) => {
    const parser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
    parser.parseString(xml, (err, result) => {
      if(err) reject(err);
      resolve(result);
    })
  })
}

export const mountNewFile = (file) => {
  return readAsync(file)
  .then(xml => {
    return convertXmlAsync(xml)
  }).then(res => {
    const {
      log,
      participation,
      matches,
      batchid,
      coordinator,
      eliminationType,
      enddate,
      eventguid,
      eventtypecode,
      format,
      iscasuallreportonly,
      isplayoff,
      isstarted,
      manualmatchround,
      notes,
      numberofrounds,
      playoffstartround,
      postevententry,
      sanctionnumber,
      seats,
      startdate,
      status,
      title
    } = res.event;
    return {
      logs: log.entry.map(({_, date, operation}) => ({
        WERInfo: _,
        date,
        operation
      })),
      players: participation.person.map(({first, middle, last, id, country}) => ({
        first,
        last,
        middle,
        dci: id,
        country
      })),
      matches: matches.round.reduce(
        ( accumulator, currentValue ) => (
          accumulator.concat(
            currentValue.match.map(
              ( match ) => ({
                ...match,
                PlayFormat: currentValue.PlayFormat,
                date: currentValue.date,
                round: parseInt(currentValue.number,10),
                number: parseInt(currentValue.number,10),
                win: parseInt(match.win,10),
                loss: parseInt(match.loss,10),
                draw: parseInt(match.draw,10),
                outcome: parseInt(match.outcome,10),
                teamformat: /true/i.test(currentValue.teamformat),
                winbydrop: /true/i.test(match.windbydrop),
              })
            )
          )
        )
      ,[]),
      event: {
        batchid,
        coordinator,
        eliminationType,
        enddate,
        eventguid,
        eventtypecode,
        format,
        iscasuallreportonly,
        isplayoff,
        isstarted,
        manualmatchround,
        notes,
        numberofrounds,
        playoffstartround,
        postevententry,
        sanctionnumber,
        seats,
        startdate,
        status,
        title
      }
    }
  })
}
