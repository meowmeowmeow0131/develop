module.exports = {
  // log4jsパッケージの設定
  log4js: {
    appenders: {
      Dummy: {
        type: 'console',
        layout: {
          type: 'messagePassThrough'
        }
      },
      ConsoleLogAppender: {
        type: 'logLevelFilter',
        appender: 'Dummy',
        level: 'info',
      },
      SystemLogAppender: {
        type: 'dateFile',
        layout: {
          type: 'messagePassThrough',
        },
        filename: '/home/vagrant/app/log/aws-sam.log',
        pattern: '-yyyy-MM-dd',
        encoding: 'utf-8',
        daysToKeep: '',
        keepFileExt: 'true'
      }
    },
    categories: {
      default: {
        appenders: [
          'ConsoleLogAppender',
          'SystemLogAppender'
        ],
        level: 'all'
      }
    }
  }
};