-- Create the table
CREATE TABLE pdf_files (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    file_size BIGINT,
    pdf BYTEA
);


-- Import PDF files from directory
DO $$
DECLARE
    file_name TEXT;
    file_size BIGINT;
    file_content BYTEA;
BEGIN
    -- Iterate over files in directory
    FOR file_name IN
        SELECT *
        FROM pg_ls_dir('/var/lib/postgresql/data/PDF_example')
        WHERE pg_ls_dir ~ '\.pdf$'
    LOOP
        file_size := (pg_stat_file('/var/lib/postgresql/data/PDF_example/' || file_name)).size;
        file_content := pg_read_binary_file('/var/lib/postgresql/data/PDF_example/' || file_name);
        INSERT INTO pdf_files (name, file_size, pdf)
        VALUES (file_name, file_size, file_content);
    END LOOP;
END $$;



