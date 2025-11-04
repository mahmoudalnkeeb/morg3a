import app from '@/app';
import { config, logger } from '@/config';

const port = config.app.port;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
