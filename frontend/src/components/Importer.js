import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import AutomaticImport from './AutomaticImport';
import ManualImport from './ManualImport';

export default function Importer() {
  const [importType, setImportType] = useState(0);

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
        mb={4}
      >
        <Stack spacing={2} direction="row">
          <Button 
            variant="contained"
            color={importType === 0 ? "primary" : "secondary"}
            onClick={() => setImportType(0)}
          >Automatic Import</Button>
          <Button
            variant="contained"
            color={importType === 1 ? "primary" : "secondary"}
            onClick={() => setImportType(1)}
          >Manual Import</Button>
        </Stack>
      </Box>

      {importType === 0 ? <AutomaticImport /> : <ManualImport />}
    </div>
  );
}
