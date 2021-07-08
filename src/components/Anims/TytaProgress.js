import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStylesProgress = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  top: {
    color: '#1a90ff',
    animationDuration: '1050ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

const TytaProgress  = ({progress}) => {
  const classes = useStylesProgress();
  return (
    <div className={classes.root + ` boxProgrees`}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={20}
        thickness={4}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        className={classes.top + ` lineProgrees`}
        classes={{
          circle: classes.circle,
        }}
        size={20}
        thickness={4}
        value={progress}
      />
    </div>
  );
};

export default TytaProgress;