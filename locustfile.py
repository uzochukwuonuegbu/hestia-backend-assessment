from locust import HttpUser, task, TaskSet, between

class PivotCSV(HttpUser):
    wait_time = between(1, 5)
    
    @task(2)
    def pivot_csv_transform(self):
        files = {
            "file": self._get_csv_file("sample.csv"),
        }
        self.client.post('/pivot-csv/transform', files=files, verify=False)

    def _get_csv_file(self, file_path, file_content_type='text/csv'):
        import os
        file_name = os.path.basename(file_path)
        file_content = open(file_path, 'rb')
        return file_name, file_content, file_content_type